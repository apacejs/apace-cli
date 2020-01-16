const express = require('express')

const router = express.Router()

router.get('/', (req, res) => res.json({ code: '0000', message: 'hello world aaa' }))

module.exports = router