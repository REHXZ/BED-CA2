//////////////////////////////////////////////////////
// REQUIRE MODULES
//////////////////////////////////////////////////////
const pool = require('../services/db');

module.exports.TotalTasks = (callback) => {
    const SQLSTATMENT = `
    select count(task_id) as totaltaskcompleted from task;`;
    pool.query(SQLSTATMENT, callback);
}



module.exports.TotalCredit = (callback) => {
    const SQLSTATMENT = `
    select sum(Credit_Earned) as Credit_Count from credit;`;
    pool.query(SQLSTATMENT, callback);
}

//////////////////////////////////////////////////////
// CREATE NEW USER
//////////////////////////////////////////////////////
module.exports.insertSingle = (data, callback) => {
    const SQLSTATMENT = `
    INSERT INTO credit (Credit_Earned, user_id)
    VALUES (?, ?);

    INSERT INTO task (points, user_id) values (?,?);
    `;
    const VALUES = [data.total_credits,data.user_id,data.points,data.user_id];

    pool.query(SQLSTATMENT, VALUES, callback);
}


module.exports.UpdateCredit = (data, callback) => {
    const SQLSTATMENT = `
    INSERT INTO credit (Credit_Earned, user_id)
    VALUES (?, ?);
    `;
    const VALUES = [data.total_credits,data.user_id];

    pool.query(SQLSTATMENT, VALUES, callback);
}