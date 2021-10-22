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

/*********************增值功能*****************/
//当前公告查看详情
router.get('/NoticeDetails', function (req, res, next) {
    admin.NoticeDetails(req, res)
});

//当前 公告删除功能(同时清空该公告的被阅读记录)
router.get('/delNotice', function (req, res, next) {
    admin.delNotice(req, res)
});

//添加班级或者专业
router.get('/addClasses', function (req, res, next) {
    admin.addClasses(req, res)
});

//获取班级或者专业
router.get('/getClasses', function (req, res, next) {
    admin.getClasses(req, res)
});

//模糊查询班级(分页获取数据与数量)
router.get('/getClassesSear', function (req, res, next) {
    admin.getClassesSear(req, res)
});
module.exports = router;
