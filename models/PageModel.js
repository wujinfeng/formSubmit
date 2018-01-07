const pool = require('../lib/mysql').mysqlService1;
const config = require('../config/config');
const logger = config.logger;

/**
 * 页面数据，对应数据库: collect
 */
class PageModel {
    constructor(o) {
        this.content = o.content ? o.content.trim() : '';
        this.ip = o.ip
    }

    /**
     * 初始化
     * @returns {boolean}
     */

    init() {
        if (!this.content) {
            logger.error('填写内容为空');
            return false;
        }
        return true;
    }

    /**
     * 添加
     * @param cb
     */
    add(cb) {
        let selectSql = 'select count(*) as count from collect where to_days(ctime)=to_days(now()) and ip=?';
        let insertSql = 'insert into collect set ?';
        let option = {
            content: this.content,
            ip: this.ip
        };
        pool.getConnection(function (err, connection) {
            if (err) {
                return cb(err);
            }
            connection.query(selectSql, option.ip, function (err, row) {
                if (err) {
                    connection.release();
                    return cb(err);
                }
                if (row[0].count < config.ipMaxCount) {
                    connection.query(insertSql, option, function (err, row) {
                        connection.release();
                        cb(err, row);
                    });
                } else {
                    connection.release();
                    cb(new Error(`每天每ip最多${config.ipMaxCount}次`))
                }
            });
        });
    }

}

module.exports = PageModel;