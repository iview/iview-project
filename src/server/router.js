import express from 'express'

const router = express.Router()

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index')
})

router.get('/ajax/get-slogan', function(req, res, next) {
    res.json({
        slogan: 'Welcome to your iView app!'
    })
})

router.get('/ajax/get-vercode', function(req, res, next) {
    res.json({
        vercode: ~~(Math.random() * 1000000),
        times: 10
    })
})

router.get('*', function(req, res, next) {
    res.render('index')
})

export default router
