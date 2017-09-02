import express from 'express'
import ccap from 'ccap'
import User from './schema/user.js'

const router = express.Router()
const captcha = ccap({
    width: 200,
    height: 40,
    offset: 34,
    quality: 100,
    fontsize: 34
})

let ccapAry = []

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

router.get('/ajax/get-imgcode', function (req, res, next) {
    ccapAry = captcha.get()
    console.log(ccapAry[0])
    res.end(ccapAry[1])
})

router.post('/ajax/ver-imgcode', function (req, res, next) {
    res.end(req.body.value.toLowerCase() === ccapAry[0].toLowerCase() ? '验证成功' : '验证失败')
})

router.get('*', function (req, res, next) {
    res.render('index')
})

export default router
