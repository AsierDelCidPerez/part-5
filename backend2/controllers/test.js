const router = require('express').Router()
const User = require('../model/user')
const Blog = require('../model/blog')

router.post('/reset', async(req, res) => {
    await User.deleteMany({})
    await Blog.deleteMany({})

    res.status(204).end()
})

module.exports = router