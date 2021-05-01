const events = require('events');

/**
 * max RPM of Engine is 1 revolution per second * 60
 * velocity dependent on duty-cycle (dc), 1 revolution * percent duty-cycle
 */
module.exports = class Engine extends events.EventEmitter {
  constructor() {
    super();
    this.running = false; // timeout id of sample-rate
    this.resolution = 750; // timeout in milliseconds, how often the engine will advance, smaller time means finer data
    this.dc = 0.1; // duty-cycle, indicative of percent of power fed to active coil, affects radians per second, ie speed
    this.r = 2 * Math.PI; // current position of crankshaft, in radians
    this.rpm = 0.0; // revolutions per minute
    this.c1 = { mA: 0, t: 0 }; // power and temperature of coil 1
    this.c2 = { mA: 0, t: 0 }; // power and temperature of coil 2
    this.c3 = { mA: 0, t: 0 }; // power and temperature of coil 3
    this.c4 = { mA: 0, t: 0 }; // power and temperature of coil 4
    this.c5 = { mA: 0, t: 0 }; // power and temperature of coil 5
    this.c6 = { mA: 0, t: 0 }; // power and temperature of coil 6
    this.ms = Date.now(); // current timestamp, in milliseconds, since epoch
  }

  range(from, to) {
    return Array.from({ length: to - from + 1 }, (v, k) => k + from);
  }

  degToRad(d) {
    return d * (Math.PI / 180);
  }

  radToDeg(r) {
    return r * (180 / Math.PI);
  }

  mapAngleToIndex() {
    return this.range(1, 360).reduce((accumulator, element, index) => {
      const angle = index + 1;
      if (angle === 360 || angle < 60) accumulator[angle] = 0;
      else if (angle >= 60 && angle < 120) accumulator[angle] = 1;
      else if (angle >= 120 && angle < 180) accumulator[angle] = 2;
      else if (angle >= 180 && angle < 240) accumulator[angle] = 3;
      else if (angle >= 240 && angle < 300) accumulator[angle] = 4;
      else if (angle >= 300 && angle < 360) accumulator[angle] = 5;
      return accumulator;
    }, []);
  }

  mAAdvance(active) {
    const limit = 1000.0; // at full duty cycle, consumes max 1000mA@24V
    const min = limit * (active ? this.dc : 0.002); // at % (duty cycle || quiescent), consumes minimum ...
    const max = min * (1.0 + 0.005); // at % duty cycle, consumes mininimum + 1%
    return Math.random() * (max - min + 1) + min;
  }

  tAdvance(active) {
    const min = (active ? this.dc : this.dc - (this.dc / 100) * 10.0) * 100 + 20;
    const max = min * (1.0 + 0.02);
    return Math.random() * (max - min + 1) + min;
  }

  cAdvance(active) {
    const mA = this.mAAdvance(active);
    const t = this.tAdvance(active);
    return { mA, t };
  }

  get dutycycle() {
    return this.dc;
  }

  set dutycycle({ dutycycle, client }) {
    this.dc = dutycycle;
    this.emit('dutycycle', { dutycycle: this.dc, client });
    console.log(`duty-cycle updated, ${this.dc}`);
  }

  get sampling() {
    return {
      r: this.r,
      rpm: this.rpm,
      c1: this.c1,
      c2: this.c2,
      c3: this.c3,
      c4: this.c4,
      c5: this.c5,
      c6: this.c6,
      ms: this.ms,
    };
  }

  advance(resolve, reject) {
    const speedFactor = this.dc * 2;
    const radiansPerMillisecond = (2 * Math.PI * speedFactor) / 1000;
    const ms = Date.now();
    const duration = ms - this.ms; // time since last iteration, ie make sample independent of how often it's incremented
    const r = (this.r + radiansPerMillisecond * duration) % (2 * Math.PI);
    const rpm = (radiansPerMillisecond * 1000 * 60) / (2 * Math.PI);
    const index = this.mapAngleToIndex[this.radToDeg(r)];

    this.r = r;
    this.rpm = rpm;

    this.c1 = this.cAdvance(index === 0);
    this.c2 = this.cAdvance(index === 1);
    this.c3 = this.cAdvance(index === 2);
    this.c4 = this.cAdvance(index === 3);
    this.c5 = this.cAdvance(index === 4);
    this.c6 = this.cAdvance(index === 5);

    this.ms = ms;

    this.emit('advance', this.sampling);

    /**
    console.log(`engine advanced to ${('0000000' + this.radToDeg(this.r).toFixed(3)).slice(-7)}° @ ${('0000000' + this.rpm.toFixed(3)).slice(-7)} rpm`);
     **/

    return this;
  }

  start() {
    const willStop = new Promise((resolve, reject) => {
      if (!this.running) {
        this.running = setInterval(() => this.advance(resolve, reject), this.resolution);
      } else {
        reject(`Engine already running.`);
      }
    });
    this.emit('start', this.sampling);
    console.log(`engine started.`);
    return willStop;
  }

  stop() {
    clearInterval(this.running);
    this.running = false;
    this.emit('stop', this.sampling);
    console.log(`engine stopped`);
  }

  *generator() {
    yield JSON.stringify(this.advance());
  }
};
