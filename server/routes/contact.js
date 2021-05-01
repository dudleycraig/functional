const express = require('express');
const router = express.Router();

const nodemailer = require('nodemailer');

const rules = {
  required: { validator: (value) => value.length > 0, message: { id: 'word', date: new Date(), status: 'error', text: 'Required.' } },
  word: { validator: (value) => /^[a-zA-Z_-]{3,32}$/.test(value), message: { id: 'word', date: new Date(), status: 'error', text: 'Invalid word.' } },
  nope: { validator: (value) => !/^(boss|god|lord)$/i.test(value), message: { id: 'nope', date: new Date(), status: 'error', text: '... nope' } },
  words: { validator: (value) => /^([a-zA-Z _-]{3,32})$/.test(value), message: { id: 'words', date: new Date(), status: 'error', text: 'Invalid words.' } },
  email: { validator: (value) => /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(value), message: { id: 'email', date: new Date(), status: 'error', text: 'Invalid Email.' } },
  phone: { validator: (value) => /^\+?[0-9 -]{10,16}$/.test(value), message: { id: 'phone', date: new Date(), status: 'error', text: 'Invalid Phone.' } },
  text: { validator: (value) => /^[a-zA-Z0-9 \.,;!?#@%&*()-]{3,256}$/.test(value), message: { id: 'text', date: new Date(), status: 'error', text: 'Invalid Text.' } },
};

router.post('/', (req, res) => {
  const initialFields = {
    name: { rules: [{ ...rules.words, message: { ...rules.words.message, text: 'Alphabetic characters (incl space).\nNo less than 3, no more than 32.' } }, rules.nope], status: 'inert', value: '', messages: {} },
    email: { rules: [{ ...rules.email, message: { ...rules.email.message, text: 'Invalid email.' } }], status: 'inert', value: '', messages: {} },
    query: { rules: [{ ...rules.text, message: { ...rules.text.message, text: 'Alphanumeric, space and punctuation (excl quotes).\nNo less than 3, no more than 256.' } }], status: 'inert', value: '', messages: {} },
  };
  const smtp = {
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: process.env.SMTP_SECURE,
    requireTLS: process.env.SMTP_REQUIRE_TLS,
    auth: { user: process.env.SMTP_USERNAME, pass: process.env.SMTP_PASSWORD },
    from: { email: process.env.SMTP_FROMEMAIL, name: process.env.SMTP_FROMNAME },
  };
  const validateField = (field) =>
    field.rules.reduce((accumulator, rule) => ({ ...accumulator, ...(!rule.validator(accumulator.value) ? { messages: { ...accumulator.messages, [rule.message.id]: rule.message }, status: 'error' } : {}) }), { ...field, messages: {}, status: 'success' });

  const fields = Object.keys(req.body).reduce((accumulator, key) => ({ ...accumulator, [key]: validateField({ ...accumulator[key], value: req.body[key] }) }), initialFields);
  const validated = Object.keys(fields).every((key) => fields[key].status === 'success');
  const payload = Object.keys(fields).reduce((accumulator, key) => ({ ...accumulator, [key]: { name: accumulator[key].name, value: accumulator[key].value, messages: accumulator[key].messages, status: accumulator[key].status } }), fields);
  if (!validated) return res.send({ status: 'error', message: { status: 'error', text: 'Failed server validation.' }, fields: payload });

  const mail = {
    from: `${fields.name.value} <${fields.email.value}>`,
    to: smtp.from.email,
    subject: 'Query from functional.org.za',
    text: `name: ${fields.name.value}\nemail: ${fields.email.value}\nquery: ${fields.query.value}`,
    html: `<div style="width:100%; margin: 0 auto; min-height:200px; margin-top:20px; text-align:center;"><dl style="vertical-align:middle;"><dt style="padding:0; margin:0; width:60px; float:left; text-align:right; clear:left;">name:</dt><dd style="float:left; text-align:left; clear:right; padding:0 0 0 5px; margin:0;">${fields.name.value}</dd><dt style="padding:0; margin:0; width:60px; float:left; text-align:right; clear:left;">email:</dt><dd style="float:left; text-align:left; clear:right; padding:0 0 0 5px; margin:0;">${fields.email.value}</dd><dt style="padding:0; margin:0; width:60px; float:left; text-align:right; clear:left;">query:</dt><dd style="float:left; text-align:left; clear:right; padding:0 0 0 5px; margin:0;">${fields.query.value}</dd></dl></div>`,
  };

  try {
    const transporter = nodemailer.createTransport(smtp);
    transporter.verify((error) => {
      if (error) return res.send({ message: { status: 'error', text: 'SMTP server unavailable.' }, fields: payload });
    });

    transporter.sendMail(mail, (error) => {
      if (error) return res.send({ message: { status: 'error', text: 'SMTP server failed.' }, fields: payload });
      else return res.send({ message: { status: 'success', text: 'successfully sent message.' } });
    });
  } catch (error) {
    return res.send({ message: { status: 'error', text: 'SMTP server failed.' }, fields: payload });
  }
});

module.exports = router;
