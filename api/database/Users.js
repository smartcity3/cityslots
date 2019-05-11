//const db = require('../dbconnection'); //reference of dbconnection.js
 
async function getUserByUserName() {
    return {username: "test", password: '098f6bcd4621d373cade4e832627b4f6', roleID: 1}
}

module.exports = {
   getUserByUserName: getUserByUserName
};