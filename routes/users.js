var express = require('express');
const res = require('express/lib/response');
var router = express.Router();
const user = require('../dao/users_dao')
/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});
// 用户登录
router.post('/login', function (req, res) {
  user.Login(req, res)
})
//获取用户信息详情
router.get('/getUserDataById', function (req, res) {
  user.getUserDataById(req, res)
})
//根据用户类型进行用户信息获取(分页获取总数量与数据)
router.get('/getUsersByTypePage', function (req, res) {
  user.getUsersByTypePage(req, res)
})
module.exports = router;
