## @apace/cli

### Introduction

quickly develop restful API use NodeJS.

### Get Start

**Step1**

``` bash
$ mkdir my-project && cd my-project 
$ npm init -y
$ yarn add @apace/cli
```

**Step2**

`$ touch router.js`

edit content

``` js
const express = require('express')
const app = express.Router()

app.get('/', (req, res) => res.json({ greet: 'hello Apace' }))

module.exports = app
```

**Step3**

``` bash
$ npx apace dev
```

open browser and write: `localhost:8000`, then you will see a simple restful api.

### Target

> Someone told me: The best framework is just business code.
