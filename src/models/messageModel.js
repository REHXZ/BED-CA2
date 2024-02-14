const pool = require('../services/db');

module.exports.selectAll = (callback) =>
{
    const SQLSTATMENT = `
    SELECT
        Messages.id,
        Messages.message_text,
        Messages.user_id,
        user.username,
        DATE_FORMAT(Messages.created_at, '[%e %M %Y] %h:%i %p') AS created_at
    FROM
        Messages
    JOIN
        user ON Messages.user_id = user.user_id;
`;



    pool.query(SQLSTATMENT, callback);
}

module.exports.insertSingle = (data, callback) =>
{
    const SQLSTATMENT = `
    INSERT INTO Messages (message_text, user_id)
    VALUES (?, ?);
    `;
    const VALUES = [data.message_text, data.user_id];

    pool.query(SQLSTATMENT, VALUES, callback);
}

module.exports.deleteById = (data, callback) =>
{
    const SQLSTATMENT = `
    DELETE FROM Messages 
    WHERE id = ?;
    `;
    const VALUES = [data.id];

    pool.query(SQLSTATMENT, VALUES, callback);
}

module.exports.updateById = (data, callback) =>
{
    const SQLSTATMENT = `
    UPDATE Messages 
    SET message_text = ?, user_id = ?
    WHERE id = ?;
    `;
    const VALUES = [data.message_text, data.user_id, data.id];

    pool.query(SQLSTATMENT, VALUES, callback);
}


module.exports.TotalMessages = (callback) =>
{
    const SQLSTATMENT = `
    select count(id) as totalmessages from messages;
    `;
    pool.query(SQLSTATMENT, callback);
}