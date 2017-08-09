import express from 'express'
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
        vercode: ~~(Math.random() * 1000000),
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

router.get('*', function (req, res, next) {
    res.render('index')
})

export default router
