let tools = require('../utils/tools')
module.exports = class students_mod extends require('./model') {
    /**
     *我的通知分页获取数据与数量
     *
     * @static
     * @param {*} token
     * @param {*} pageNum
     * @param {*} currPage
     */
    static getNoticeMod(token, pageNum, currPage) {
        pageNum = Number(pageNum)
        currPage = Number(currPage)
        currPage = Number(pageNum * currPage);
        return new Promise((resolve, reject) => {
            let sql = "  SELECT  * FROM notice WHERE class like '%" + token + "%' order by createtime desc LIMIT ?,?"
            this.query(sql, this.formParams(currPage, pageNum)).then(res => { resolve(res) }).catch(error => { reject(error) })
        })
    }

    static getNoticeTotal(token) {
        return new Promise((resolve, reject) => {
            let sql = " select count(1) as count from notice WHERE class like '%" + token + "%'"
            this.query(sql).then(res => { resolve(res) }).catch(error => { reject(error) })
        })
    }

    /**
     *获取的我通知已读列表(供已读未读状态渲染)
     *
     * @static
     * @param {*} id
     * @return {*} 
     */
    static getNoticeReadMod(id) {
        return new Promise((resolve, reject) => {
            let sql = "select * from `read` where u_id =?"
            this.query(sql, this.formParams(id)).then(res => { resolve(res) }).catch(error => { reject(error) })
        })
    }

    /**
     *已读转为未读
     *
     * @static
     * @param {*} n_id
     * @param {*} u_id
     */
    static goweiduMod(n_id, u_id) {
        n_id = Number(n_id)
        u_id = Number(u_id)
        return new Promise((resolve, reject) => {
            let sql = "delete from `read` where u_id = ? and n_id = ? "
            this.query(sql, this.formParams(u_id, n_id)).then(res => { resolve(`${u_id}已经转为未读`) }).catch(error => { reject('转换失败') })
        })
    }

    /**
     *未读转为已读
     *
     * @static
     * @param {*} n_id
     * @param {*} u_id
     */
    static goyiduMod(n_id, u_id) {
        n_id = Number(n_id)
        u_id = Number(u_id)
        return new Promise((resolve, reject) => {
            let sql = "INSERT INTO   `read` (u_id, n_id) VALUES ('" + u_id + "','" + n_id + "')"
            console.log(sql);
            this.query(sql).then(res => { resolve(`${u_id}的${n_id}已经转为已读`) }).catch(error => { reject('转换失败') })
        })
    }

    /**
     *健康填报表
     *
     * @static
     * @param {*} u_id
     * @param {*} temperature
     * @param {*} hot
     * @param {*} gohubei
     * @param {*} hubeiren
     * @param {*} fever
     * @param {*} leave
     * @param {*} hesuan
     * @param {*} mask
     * @param {*} masknum
     * @param {*} kill
     */
    static sethealthMod(u_id, temperature, hot, gohubei, hubeiren, fever, leave, hesuan, mask, masknum, kill) {
        return new Promise((resolve, reject) => {
            let sql = "insert into healthy(u_id, temperature, hot, gohubei, hubeiren, fever, leaveout, hesuan, mask, masknum, kills) values (?,?,?,?,?,?,?,?,?,?,?)"
            this.query(sql, this.formParams(u_id, temperature, hot, gohubei, hubeiren, fever, leave, hesuan, mask, masknum, kill)).then(res => { resolve("添加成功") }).catch(err => { reject("添加失败") })
        })
    }

    /**
     *获取当天所有填报表与总数量(分页获取)
     *
     * @static
     * @param {*} pageNum
     * @param {*} currPage
     */
    static gethealthNowDayPageMod(oldDate, newDate, pageNum, currPage) {
        pageNum = Number(pageNum)
        currPage = Number(currPage)
        currPage = Number(currPage * pageNum);
        return new Promise((resolve, reject) => {
            let sql = "  SELECT  * FROM healthy  where createtime between ? and ? LIMIT ?,?"
            this.query(sql, this.formParams(oldDate, newDate, currPage, pageNum)).then(res => { resolve(res) })
                .catch(err => { reject(err) })
        })
    }

    //获取总数
    static gethealthNowDayTotal() {
        return new Promise((resolve, reject) => {
            let sql = " select count(1) as count from healthy "
            this.query(sql).then(res => { resolve(res) }).catch(err => { reject(err) })
        })
    }

    /**
     *
     *根据用户ID获取当天某用户报表
     * @static
     * @param {*} id
     */
    static getHealthNowDayByIdMod(id) {
        return new Promise((resolve, reject) => {
            let sql = "select * from healthy where u_id=" + id
            this.query(sql).then(res => { resolve(res) }).catch(err => { reject(err) })
        })
    }

    /**
   *
   *获取所有报表
   * @static
   */
    static getAllHealthMod() {
        return new Promise((resolve, reject) => {
            let sql = "select * from healthy"
            this.query(sql).then(res => { resolve(res) }).catch(err => { reject(err) })
        })
    }

    /**
     *请假申请
     *
     * @static
     * @param {*} id
     * @param {*} reason
     * @param {*} leavetype
     * @param {*} starttime
     * @param {*} endtime
     */
    static setLeaveMod(id, classes, reason, leavetype, starttime, endtime) {
        id = Number(id);
        return new Promise((resolve, reject) => {
            let sql = "insert into `leave` (u_id, classes, reason, leavetype, starttime, endtime,state) values (?,?,?,?,?,?,0) "
            this.query(sql, this.formParams(id, classes, reason, leavetype, starttime, endtime)).then(res => { resolve("请假成功") }).catch(err => { reject("请假失败") })
        })
    }
}
