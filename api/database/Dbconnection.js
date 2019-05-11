const mysql = require('mysql');
const connection = mysql.createPool({
    host:'',
    user:'',
    password:'',
    database:'citySlots'
});
module.exports = connection;