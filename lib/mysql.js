const config = require('../config/config');
const logger = config.logger;
const mysql = require('mysql');
const mysqlService1 = mysql.createPool({
    host: config.mysqlService1.host,
    port: config.mysqlService1.port,
    user: config.mysqlService1.user,
    password: config.mysqlService1.password,
    database: config.mysqlService1.database
});

//尝试连接是否成功
mysqlService1.getConnection(function (err, connection) {
    if (err) {
        console.log('connect mysql err');
        console.log(err);
        logger.log(err);
        process.exit(1);
        return;
    }
    console.log('connect mysql ok.');
    connection.release();
});

module.exports = {
    'mysqlService1': mysqlService1
};
