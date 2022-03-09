# atm_simulator

Information Systems Design Project / SoICT / HUST / 20211

## How to run

### 1. Using Docker

**Prerequisite**

- Docker
- Docker compose
- NodeJS

### Run services

```bash
docker-compose up
```

### Run gui

- change directory into `atm_gui`
- edit `src/assets/env.js`

```javascript
(function (window) {
  window["env"] = window["env"] || {};
  // env
  window["env"]["apiUrl"] = "http://localhost:8080";
  window["env"]["reader"] = "/acr/api/v1";
  window["env"]["bank"] = "/ab/api/v1";
  window["env"]["dispenser"] = "/acd/api/v1";
})(this);
```

- start gui

```bash
npm install
npm start
```
