const express = require('express')
var router = express.Router();
const admin = require('../dao/admin_dao')
/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a admin');
});

/* 根据用户类型与查询字段模糊查询 (数据与总数量返回) */
router.get('/getUsersByTypeAndChar', function (req, res, next) {
    admin.getUsersByTypeAndChar(req, res)
});

/* 发布通知 */
router.post('/announce', function (req, res, next) {
    admin.announce(req, res)
});

/* 获取所有通知与数量(分页获取) */
router.get('/getAllNotice', function (req, res, next) {
    admin.getAllNotice(req, res)
});
module.exports = router;
