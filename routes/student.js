const express = require('express')
var router = express.Router();
var students = require('../dao/students_dao')
/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a student');
});

/* 我的通知分页获取数据与数量 */
router.get('/getNotice', function (req, res, next) {
    students.getNotice(req, res);
});

/* 获取的我通知已读列表(供已读未读状态渲染)*/
router.get('/getNoticeRead', function (req, res, next) {
    students.getNoticeRead(req, res);
});

/*  已读转未读*/
router.get('/goweidu', function (req, res, next) {
    students.goweidu(req, res);
});

/*  未读转已读*/
router.get('/goyidu', function (req, res, next) {
    students.goyidu(req, res);
});

/*  健康填报表*/
router.post('/sethealth', function (req, res, next) {
    students.sethealth(req, res);
});

/*  获取当天所有填报表与总数量(分页获取)*/
router.get('/gethealthNowDayPage', function (req, res, next) {
    students.gethealthNowDayPage(req, res);
});

/*  获取当天某用户报表*/
router.get('/getHealthNowDayByid', function (req, res, next) {
    students.getHealthNowDayByid(req, res);
});

/*  获取所有报表*/
router.get('/getAllHealth', function (req, res, next) {
    students.getAllHealth(req, res);
});

/*  请假申请*/
router.post('/setLeave', function (req, res, next) {
    students.setLeave(req, res);
});
module.exports = router;
