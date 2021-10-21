const jwtUtil = require('../utils/jwtUtils')
const tools = require('../utils/tools')
module.exports = class students_dao extends require('../model/students_mod') {

    /**
     *我的通知分页获取数据与数量
     *
     * @static
     * @param {*} req
     * @param {*} res
     */
    static async getNotice(req, res) {
        let query = req.query;
        let verify = await jwtUtil.verifysync(req.query.token, globalKey)
        let u_classes = verify.classes
        let data = await this.getNoticeMod(u_classes, query.pageNum, query.currPage);
        let total = await this.getNoticeTotal(u_classes);
        res.send({ data, total: total[0].count })
    }

    /**
     *获取的我通知已读列表(供已读未读状态渲染)
     *
     * @static
     * @param {*} req
     * @param {*} res
     */
    static async getNoticeRead(req, res) {
        let query = req.query;
        let verify = await jwtUtil.verifysync(query.token, globalKey)
        let id = verify.id;
        let data = await this.getNoticeReadMod(id);
        res.send(data);
    }

    /**
     *已读转为未读
     *
     * @static
     * @param {*} req
     * @param {*} res
     */
    static async goweidu(req, res) {
        let query = req.query;
        let verify = await jwtUtil.verifysync(query.token, globalKey)
        let u_id = verify.id;
        let result = await this.goweiduMod(query.n_id, u_id);
        res.send(result);
    }

    /**
     *未读转已读
     *
     * @static
     * @param {*} req
     * @param {*} res
     */
    static async goyidu(req, res) {
        let query = req.query;
        let verify = await jwtUtil.verifysync(query.token, globalKey)
        let u_id = verify.id;
        let result = await this.goyiduMod(query.n_id, u_id);
        res.send(result);
    }

    /**
     *健康填报表
     *
     * @static
     * @param {*} req
     * @param {*} res
     */
    static async sethealth(req, res) {
        let query = req.query;
        // let token = req.token;
        // let verify = await jwtUtil.verifysync(token, globalKey)
        // let u_id = verify.id;
        let u_id = query.u_id
        console.log(u_id)
        let temperature = query.temperature;
        let hot = query.hot;
        let gohubei = query.gohubei;
        let hubeiren = query.hubeiren;
        let fever = query.fever;
        let leave = query.leave;
        let hesuan = query.hesuan;
        let mask = query.mask;
        let masknum = query.masknum;
        let kill = query.kill;
        console.log(query)
        let result = await this.sethealthMod(u_id, temperature, hot, gohubei, hubeiren, fever, leave, hesuan, mask, masknum, kill);

        res.send(result);

    }

    /**
     *
     * 获取当天所有填报表
     *
     * @static
     * @param {*} req
     * @param {*} res
     */
    static async gethealthNowDayPage(req, res) {
        let query = req.query;
        let date = new Date();
        let Month = ''
        if ((date.getMonth() + 1) < 10) Month = "0" + String(date.getMonth() + 1);
        else Month = "" + (date.getMonth() + 1);
        let oldDate = "" + date.getFullYear() + Month + date.getDate()
        let newDate = "" + date.getFullYear() + Month + (date.getDate() + 1)
        let data = await this.gethealthNowDayPageMod(oldDate, newDate, query.pageNum, query.currPage);
        let total = await this.gethealthNowDayTotal();
        res.send({ data, total: total[0].count })

    }

    /**
     *获取当天某用户报表
     *
     * @static
     * @param {*} req
     * @param {*} res
     */
    static async getHealthNowDayByid(req, res) {
        let token = req.query.token;
        let verify = await jwtUtil.verifysync(token, globalKey);
        let u_id = verify.id;
        let data = await this.getHealthNowDayByIdMod(u_id)
        res.send(data);
    }


    /**
    *获取所有报表
    *
    * @static
    * @param {*} req
    * @param {*} res
    */
    static async getAllHealth(req, res) {
        let data = await this.getAllHealthMod()
        res.send(data);
    }

    /**
     *请假申请
     *
     * @static
     * @param {*} req
     * @param {*} res
     */
    static async setLeave(req, res) {
        let query = req.query;
        let token = query.token;
        let verify = await jwtUtil.verifysync(token, globalKey);
        let u_id = verify.id;
        let classes = verify.classes
        let result = await this.setLeaveMod(u_id, classes, query.reason, query.leavetype, query.starttime, query.endtime);
        res.send(result);
    }

 

}