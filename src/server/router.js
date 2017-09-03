import express from 'express'
// import ccap from 'ccap'
import svgCaptcha from 'svg-captcha'
import User from './schema/user.js'

const router = express.Router()

let success = {
    success: true
}

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index')
})

router.get('/ajax/get-slogan', function (req, res, next) {
    res.json({
        slogan: 'Welcome to your iView app!'
    })
})

router.get('/ajax/get-vercode', function (req, res, next) {
    res.json({
        vercode: Math.random().toString(36).slice(2, 8),
        times: 10
    })
})

router.get('/user/get-user', function (req, res, next) {
    User.find({}).then(users => {
        res.json(users)
    }).catch(err => {
        console.log('Error:' + err)
    })
})

router.post('/user/remove-user', function (req, res, next) {
    User.remove({_id: req.body.id}).then(users => {
        res.json(success)
    }).catch(err => {
        console.log('Error:' + err)
    })
})

router.post('/user/edit-user', function (req, res, next) {
    User.findByIdAndUpdate(req.body._id, req.body).then(users => {
        res.json(success)
    }).catch(err => {
        console.log('Error:' + err)
    })
})

router.post('/user/add-user', function (req, res, next) {
    let user = new User(req.body)
    user.save().then(users => {
        res.json(success)
    }).catch(err => {
        console.log('Error:' + err)
    })
})

router.get('/ajax/get-captcha', function (req, res, next) {
    let captcha = svgCaptcha.create({
        size: 4,
        width: 200,
        height: 40,
        ignoreChars: '0o1i',
        noise: 1,
        color: true,
        background: '#cc9966'
    })
    req.session.captcha = captcha.text
    res.send(captcha.data)
})

router.post('/ajax/ver-captcha', function (req, res, next) {
    let isVer = req.body.value.toLowerCase() === req.session.captcha.toLowerCase()
    res.send(isVer ? '验证成功' : '验证失败')
})

router.get('*', function (req, res, next) {
    res.render('index')
})

export default router
