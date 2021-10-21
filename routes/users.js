var express = require('express');
const res = require('express/lib/response');
var router = express.Router();
const user = require('../dao/users_dao')
/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a user');
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

/**
 *  用户删除)(同时清空该用户阅读记录)
 */
router.get('/delUserdata', function (req, res, next) {
  if (req.query.u_id == 0) res.send('管理员不可以进行删除')
  else user.delUserdata(req, res)
});

/**
 * 用户修改
 */
router.post('/upUserdata', function (req, res, next) {
  user.upUserdata(req, res)
});

/**
 * 更新用户密码
 */
router.post('/upPwd', function (req, res, next) {
  user.upPwd(req, res)
});
module.exports = router;
