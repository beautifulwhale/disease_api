
module.exports = class admin_mod extends require('./model') {
    /**
     *根据用户类型与查询字段模糊查询 (数据与总数量返回)
     *
     * @static
     * @param {*} type
     * @param {*} inputText
     * @param {*} CharType
     * @param {*} pageNum
     * @param {*} currPage
     * @return {*} 
     */
    static getUsersByTypeAndCharMod(type, inputText, CharType, pageNum, currPage) {
        currPage = Number(currPage)
        pageNum = Number(pageNum);
        currPage = Number(currPage * pageNum)
        return new Promise((resolve, reject) => {
            let sql = 'select * from user where ' + CharType + ' like"%' + inputText + '%"and type=' + type + ' LIMIT ?,?'
            this.query(sql, this.formParams(currPage, pageNum)).then(
                res => { resolve(res) }
            ).catch(err => { reject(err) })
        })
    }

    static getUsersByTypeAndCharTotal(type, inputText, CharType) {
        type = Number(type);
        return new Promise((resolve, reject) => {
            let sql = 'select count(1) as count from user where ' + CharType + ' like "%' + inputText + '%" and type=' + type
            console.log(sql)
            this.query(sql).then(res => { resolve(res) }).catch(err => { reject(err) })
        })
    }

    /**
     *发布通知
     *
     * @static
     * @param {*} title
     * @param {*} classes
     */
    static announceMod(title, classes) {
        return new Promise((resolve, reject) => {
            let sql = "INSERT INTO   `notice` (title, class) VALUES ('" + title + "','" + classes + "')"
            this.query(sql).then(res => { resolve("发布成功") }).catch(err => { reject("发布失败") })
        })

    }

    /**
     *获取所有通知与数量(分页获取)
     *
     * @static
     * @param {*} pageNum
     * @param {*} currentPage
     */
    static getAllNoticeMod(pageNum, currentPage) {
        pageNum = Number(pageNum)
        currentPage = Number(currentPage)
        currentPage = Number(currentPage * pageNum);
        return new Promise((resolve, reject) => {
            let sql = "  SELECT  * FROM notice  order by createtime desc  LIMIT ?,?"
            this.query(sql, this.formParams(currentPage, pageNum)).then(res => { resolve(res) }).catch(err => { reject(err) })
        })
    }

    static getAllNoticeTotal() {
        return new Promise((resolve, reject) => {
            let sql = " select count(1) as count from notice "
            this.query(sql).then(res => { resolve(res) }).catch(err => { reject(err) })
        })
    }

    /**
  *获取该用户所属班级的全部请假单与数量(分页查询)
  *
  * @static
  * @param {*} id
  * @param {*} classes
  * @param {*} pageNum
  * @param {*} currPage
  */
    static getLeaveMod(classArr, pageNum, currPage) {
        pageNum = Number(pageNum)
        currPage = Number(currPage)
        currPage = Number(currPage * pageNum);
        return new Promise((resolve, reject) => {
            let sql = "select * from `leave` where classes = "
            for (let i = 0; i < classArr.length; i++) {
                if (i == 0) sql += " '" + classArr[i] + "' "
                else sql += " or classes= '" + classArr[i] + "' "
            }
            sql += " order by createtime desc limit  " + currPage + " , " + pageNum;
            this.query(sql).then(res => { resolve(res) }).catch(err => { reject(err) })
        })
    }

    static getLeaveTotal(classArr) {
        return new Promise((resolve, reject) => {
            let sql = "select count(1) as count   from `leave` where classes = "
            for (let i = 0; i < classArr.length; i++) {
                if (i == 0) sql += " '" + classArr[i] + "' "
                else sql += " or classes= '" + classArr[i] + "' "
            }
            console.log(sql)
            this.query(sql).then(result => {
                resolve(result)
            }).catch(err => {
                reject("您没有学生请假")
            })
        })
    }

    /**
     *获取该用户请假审批与数量(分页)
     *
     * @static
     * @param {*} id
     * @param {*} pageNum
     * @param {*} currPage
     */
    static getuserLeaveMod(u_id, pageNum, currPage) {
        pageNum = Number(pageNum)
        currPage = Number(currPage)
        currPage = Number(currPage * pageNum);
        return new Promise((resolve, reject) => {
            let sql = "select * from `leave` where u_id= ? order by createtime desc limit ?,? "
            this.query(sql, this.formParams(u_id, currPage, pageNum)).then(result => {
                resolve(result)
            }).catch(err => {
                reject("您没有请假记录")
            })
        })
    }

    static getuserLeaveTotal(u_id) {
        return new Promise((resolve, reject) => {
            let sql = "select count(1) as count  from `leave` where u_id= ? "
            this.query(sql, this.formParams(u_id)).then(result => {
                resolve(result)
            }).catch(err => {
                reject("您没有请假记录")
            })
        })
    }
    /**
     *当前请假单审批(修改审批状态)
     *
     * @static
     * @param {*} id
     * @param {*} state
     */
    static upLeaveStateMod(id, state) {
        id = Number(id)
        state = Number(state);
        return new Promise((resolve, reject) => {
            let sql = "update `leave` set state = ? where l_id = ? "
            console.log(sql)
            this.query(sql, this.formParams(state, id)).then(result => {
                resolve("状态修改成功")
            }).catch(err => {
                reject("状态修改失败")
            })
        })
    }


    /*****************************************增值功能******************************************/

    //当前公告已读人数
    static getReadNumber(n_id) {
        n_id = Number(n_id)
        return new Promise((resolve, reject) => {
            let sql = "select count(1) as count from `read` where n_id=" + n_id
            this.query(sql).then(res => { resolve(res) }).catch(err => { reject(err) })
        })
    }

    /**
     *当前公告查看详情
     *
     * @param {*} n_id
     */
    static NoticeDetailsMod(n_id) {
        n_id = Number(n_id)
        return new Promise((resolve, reject) => {
            let sql = "select * from `notice` where n_id=" + n_id
            this.query(sql).then(res => { resolve(res) }).catch(err => { reject(err) })
        })
    }

    //阅读公告的用户ID
    static getUserIdByRead(n_id) {
        n_id = Number(n_id)
        return new Promise((resolve, reject) => {
            let sql = "select u_id from `read` where n_id=" + n_id
            this.query(sql).then(res => { resolve(res) }).catch(err => { reject(err) })
        })
    }

    //获取用户详细信息
    static getUserInfo(readUserIdArr) {
        return new Promise((resolve, reject) => {
            let sql = ""
            for (let i = 0; i < readUserIdArr.length; i++) {
                if (i == 0)
                    sql += "select id,username,head,classes,createtime from `user` where  id=  " + readUserIdArr[i].u_id
                else
                    sql += " or id= " + readUserIdArr[i].u_id
            }
            this.query(sql).then(res => { resolve(res) }).catch(err => { reject(err) })
        })
    }

    //当前公告发布通知总人数
    static NoticeDetailsTotal(classes) {
        return new Promise((resolve, reject) => {
            let sql = ""
            let classesArr = classes.split(";")
            for (let i = 0; i < classesArr.length; i++) {
                if (i == 0)
                    sql += "select count(1) as count from `user` where classes= '" + classesArr[i] + "'"
                else
                    sql += " or classes = '" + classesArr[i] + "'"
            }
            this.query(sql).then(res => { resolve(res) }).catch(err => { reject(err) })
        })
    }

    /**
     *当前 公告删除功能(同时清空该公告的被阅读记录)
     *
     * @static
     * @param {*} id
     */
    static delNoticeMod(id) {
        return new Promise((resolve, reject) => {
            let sql = "delete from `notice` where n_id=" + id
            this.query(sql).then(res => { resolve("删除公告成功") }).catch(err => { reject("删除公告失败") })
        })
    }

    /**
     *添加专业和班级
     *
     * @static
     * @param {*} classes
     */
    static addClassesMod(classes) {
        return new Promise((resolve, reject) => {
            let sql = "INSERT INTO   `class` (classes) VALUES ('" + classes + "')"
            this.query(sql).then(res => { resolve("添加班级成功") }).catch(err => { reject("添加班级失败") })
        })
    }

    /**
     *获取班级或者专业
     *
     * @static
     */
    static getClassesMod() {
        return new Promise((resolve, reject) => {
            let sql = "select * from `class` "
            this.query(sql).then(res => { resolve(res) }).catch(err => { reject(err) })
        })
    }

    /**
     *模糊查询班级(分页获取数据与数量)
     *
     * @static
     * @param {*} inputText
     * @param {*} pageNum
     * @param {*} currPage
     */
    static getClassesSearMod(inputText, pageNum, currPage) {
        pageNum = Number(pageNum)
        currPage = Number(currPage)
        currPage = Number(pageNum * currPage)
        return new Promise((resolve, reject) => {
            let sql = "select * from `class` where classes like '%" + inputText + "%' limit ?,?"
            console.log(sql)
            this.query(sql, this.formParams(currPage, pageNum))
                .then(res => { resolve(res) })
                .catch(err => { reject(err) })
        })
    }

    static getClassSearTotal(inputText) {
        return new Promise((resolve, reject) => {
            let sql = "select count(1) as count from `class` where classes like '%" + inputText + "%' "
            this.query(sql)
                .then(res => { resolve(res) })
                .catch(err => { reject(err) })
        })
    }
}