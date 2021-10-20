const jwtUtil = require('../utils/jwtUtils')
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
}