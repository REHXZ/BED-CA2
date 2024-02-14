//////////////////////////////////////////////////////
// REQUIRE MODULES
//////////////////////////////////////////////////////
const pool = require('../services/db');

//////////////////////////////////////////////////////
// CREATE NEW USER
//////////////////////////////////////////////////////
module.exports.InsertLocker = (data, callback) => {
    const SQLSTATMENT = `
    INSERT INTO locker (Item_Name, user_id)
    VALUES (?, ?);
    `;
    const VALUES = [data.name,data.user_id];

    pool.query(SQLSTATMENT, VALUES, callback);
}

module.exports.ShowLocker = (data, callback) => {
    const SQLSTATMENT = `
    select Item_Name from locker where user_id = ?;`;
    
    const VALUES = [data.user_id];

    pool.query(SQLSTATMENT, VALUES, callback);
}