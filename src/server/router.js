import express from 'express'

const router = express.Router()

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index')
})

router.get('*', function(req, res, next) {
  res.render('index')
})

export default router
