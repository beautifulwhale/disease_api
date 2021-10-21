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


/* 获取该用户所属班级的全部请假单与数量(分页查询) */
router.get('/getLeave', function (req, res, next) {
    admin.getLeave(req, res)
});

/*  获取该用户请假审批与数量(分页) */
router.get('/getuserLeave', function (req, res, next) {
    admin.getuserLeave(req, res)
});

/*  当前请假单审批(修改审批状态)*/
router.get('/upLeaveState', function (req, res, next) {
    admin.upLeaveState(req, res)
});
module.exports = router;
