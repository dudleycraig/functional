![dynamic screenshot](https://raw.githubusercontent.com/dudleycraig/functional/master/server/public/images/functional.org.za.gif)

[functional.org.za](http://functional.org.za)

## installation

### clone repository

> git clone https://github.com/dudleycraig/functional.git functional 

### update config to reflect your environment

> vim server/.env  
```
HTTP_PROTOCOL=http
HTTP_HOST=localhost
HTTP_PORT=80

ASSETS_PROTOCOL=http
ASSETS_HOST=localhost
ASSETS_PORT=80

ENGINE_PROTOCOL=ws
ENGINE_HOST=localhost
ENGINE_PORT=80

SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_SECURE=false
SMTP_REQUIRE_TLS=true
SMTP_USERNAME=personal@gmail.com
SMTP_PASSWORD=************
SMTP_FROMEMAIL=personal@gmail.com
SMTP_FROMNAME=Dudley
```

> vim client/.env  
```
REACT_APP_HTTP_PROTOCOL=http
REACT_APP_HTTP_HOST=localhost
REACT_APP_HTTP_PORT=80

REACT_APP_ASSETS_PROTOCOL=http
REACT_APP_ASSETS_HOST=localhost
REACT_APP_ASSETS_PORT=80

REACT_APP_ENGINE_PROTOCOL=ws
REACT_APP_ENGINE_HOST=localhost
REACT_APP_ENGINE_PORT=80
```

### build client

#### requirements
node-sass requires python 2.7
edit /client/.npmrc repository with following line: python="/usr/local/bin/python2.7"

node-sass requires node 14
install nvm (Node Version Manager)

install node version v14.21.3, 
> nvm install v14.21.3

toggle to installed version 
> nvm use v14.21.3

NOTE: development port is actually changed in package.json/scripts/start and not webpack.config.js/devServer

#### compile 
> cd client && npm run install && npm run build

### build server 

> cd server && npm run install && npm run build 

### run express as service

> cd server && npm run start

