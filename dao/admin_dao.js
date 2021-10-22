
const { token } = require('morgan');
const jwtUtil = require('../utils/jwtUtils')
module.exports = class admin_dao extends require('../model/adimin_mod') {
    static async getUsersByTypeAndChar(req, res) {
        let query = req.query;
        let type = query.type
        let inputText = query.inputText
        let CharType = query.CharType
        let pageNum = query.pageNum
        let currPage = query.currPage

        let data = await this.getUsersByTypeAndCharMod(type, inputText, CharType, pageNum, currPage);
        let total = await this.getUsersByTypeAndCharTotal(type, inputText, CharType);
        res.send({ data, total: total[0].count });

    }

    /**
     *发布通知
     *
     * @static
     * @param {*} req
     * @param {*} res
     */
    static async announce(req, res) {
        let query = req.query;
        let result = await this.announceMod(query.title, query.classes)
        res.send(result);
    }
    /**
     *获取所有通知与数量(分页获取)
     *
     * @static
     * @param {*} req
     * @param {*} res
     */
    static async getAllNotice(req, res) {
        let query = req.query
        let data = await this.getAllNoticeMod(query.pageNum, query.currPage);
        let total = await this.getAllNoticeTotal();
        res.send({ data, total: total[0].count })

    }


    /**
     *获取该用户所属班级的全部请假单与数量(分页查询)
     *
     * @static
     * @param {*} req
     * @param {*} res
     */
    static async getLeave(req, res) {
        let query = req.query
        let verify = await jwtUtil.verifysync(query.token, globalKey);
        let classes = verify.classes.split(';');
        let data = await this.getLeaveMod(classes, query.pageNum, query.currPage);
        let total = await this.getLeaveTotal(classes);
        res.send({ data, total: total[0].count })

    }

    /**
     *获取该用户请假审批与数量(分页)
     *
     * @static
     * @param {*} req
     * @param {*} res
     */
    static async getuserLeave(req, res) {
        let query = req.query
        let verify = await jwtUtil.verifysync(query.token, globalKey);
        let u_id = verify.id;
        let data = await this.getuserLeaveMod(u_id, query.pageNum, query.currPage);
        let total = await this.getuserLeaveTotal(u_id);
        res.send({ data, total: total[0].count })
    }


    /**
     * 当前请假单审批(修改审批状态)
     *
     * @static
     * @param {*} req
     * @param {*} res
     */
    static async upLeaveState(req, res) {
        let query = req.query;
        let result = await this.upLeaveStateMod(query.l_id, query.upState)
        res.send(result);
    }

    /**
     *当前公告查看详情
     *
     * @static
     * @param {*} req
     * @param {*} res
     */
    static async NoticeDetails(req, res) {
        let readNum = await this.getReadNumber(req.query.n_id)
        let readUserIdArr = await this.getUserIdByRead(req.query.n_id);
        let data = await this.NoticeDetailsMod(req.query.n_id);
        let total = await this.NoticeDetailsTotal(data[0].class);
        total = total[0].count
        let users = await this.getUserInfo(readUserIdArr);
        res.send({ readNum: readNum[0].count, data, users, total })
    }

    /**
     *当前 公告删除功能(同时清空该公告的被阅读记录)
     *
     * @static
     * @param {*} req
     * @param {*} res
     */
    static async delNotice(req, res) {
        let data = await this.delNoticeMod(req.query.n_id);
        res.send(data);
    }

    /**
     *添加班级或者专业
     *
     * @static
     * @param {*} req
     * @param {*} res
     */
    static async addClasses(req, res) {
        let data = await this.addClassesMod(req.query.classes)
        res.send(data);
    }

    /**
     *获取班级或者专业
     *
     * @static
     * @param {*} req
     * @param {*} res
     */
    static async getClasses(req, res) {
        let data = await this.getClassesMod();
        res.send(data);
    }

    /**
     *模糊查询班级(分页获取数据与数量)
     *
     * @static
     * @param {*} req
     * @param {*} res
     */
    static async getClassesSear(req, res) {
        let data = await this.getClassesSearMod(req.query.inputText, req.query.pageNum, req.query.currPage);
        let total = await this.getClassSearTotal(req.query.inputText);
        res.send({ data, total: total[0].count });
    }
}