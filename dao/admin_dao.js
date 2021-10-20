
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
}