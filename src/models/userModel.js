//////////////////////////////////////////////////////
// REQUIRE MODULES
//////////////////////////////////////////////////////
const pool = require('../services/db');

module.exports.UpdateUserbyId = (data, callback) =>
{
    const SQLSTATMENT = `
    UPDATE user SET username = ?, email = ?, Authorization=? WHERE user_id = ?;
    `;
    const VALUES = [data.username,data.email,data.Auth, data.id];

    pool.query(SQLSTATMENT, VALUES, callback);
}

module.exports.deleteUserbyId = (data, callback) =>
{
    const SQLSTATMENT = `
    DELETE FROM user 
    WHERE user_id = ?;
    `;
    const VALUES = [data.id];

    pool.query(SQLSTATMENT, VALUES, callback);
}


module.exports.TotalUser = (callback) => {
    const SQLSTATEMENT = `SELECT count(user_id) as totaluser FROM user;`;
    pool.query(SQLSTATEMENT, callback);
}

//////////////////////////////////////////////////////
// SELECT ALL PLAYERS BY USER
//////////////////////////////////////////////////////
module.exports.selectAllPlayerByUser = (data, callback) => {
    const SQLSTATEMENT = `
    SELECT PlayerUserRel.user_id, PlayerUserRel.player_id, User.username, Player.name as character_name, Player.level as character_level, Player.created_on as char_created_on, User.created_on as user_created_on
    FROM PlayerUserRel
    INNER JOIN Player ON PlayerUserRel.player_id = Player.id
    INNER JOIN User ON PlayerUserRel.user_id = User.id
    WHERE User.id = ?;
    `
    const VALUES = [data.user_id];

    pool.query(SQLSTATEMENT, VALUES, callback);
}

//////////////////////////////////////////////////////
// SELECT USER BY USERNAME
//////////////////////////////////////////////////////
module.exports.selectByUsername = (data, callback) => {
    const SQLSTATEMENT = `
    SELECT * FROM User 
    WHERE username = ?;
    `
    const VALUES = [data.username];

    pool.query(SQLSTATEMENT, VALUES, callback);
}

//////////////////////////////////////////////////////
// SELECT USER BY USERNAME OR EMAIL
//////////////////////////////////////////////////////
module.exports.selectByUsernameEmail = (data, callback) => {
    const SQLSTATEMENT = `
    SELECT * FROM User
    WHERE username = ? OR email = ?;
    `
    const VALUES = [data.username, data.email];

    pool.query(SQLSTATEMENT, VALUES, callback);
}

//////////////////////////////////////////////////////
// CREATE NEW USER
//////////////////////////////////////////////////////
module.exports.insertSingle = (data, callback) => {
    const SQLSTATMENT = `
    INSERT INTO User (username, email, password, Authorization)
    VALUES (?, ?, ?, 0);
    `;
    const VALUES = [data.username, data.email, data.password];

    pool.query(SQLSTATMENT, VALUES, callback);
}

module.exports.readAllUser = callback => {
    const SQLSTATMENT = `
    SELECT * FROM user;
    `;
    pool.query(SQLSTATMENT, callback);
}

module.exports.selectById = (data, callback) =>{
    const SQLSTATMENT = `
    SELECT * FROM User
    WHERE id = ?;
    `;
    const VALUES = [data.userId];

    pool.query(SQLSTATMENT, VALUES, callback);
}