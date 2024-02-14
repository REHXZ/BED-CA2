const pool = require('../services/db');

module.exports.TotalCredits = (data,callback) =>{
    const SQLSTATMENT = `
    select sum(Credit_Earned) from credit where user_id = ?;`;

    VALUES = [data.user_id]
    pool.query(SQLSTATMENT, VALUES, callback);    
}

module.exports.TotalWins = (data,callback) =>{
    const SQLSTATMENT = `
    select sum(points) as totalpoints from task where user_id = ?;`;

    VALUES = [data.user_id]
    pool.query(SQLSTATMENT, VALUES, callback);    
}

// module.exports.ViewTodayShop = (callback) =>{
//     const SQLSTATMENT = `
//     SELECT * FROM shop
//     ORDER BY RAND()
//     LIMIT 5;`;
//     pool.query(SQLSTATMENT, callback);    
// }

// module.exports.ViewItem = (data,callback) =>{
//     const SQLSTATMENT = `
//     SELECT Item_Name,Item_Cost FROM shop
//     WHERE Item_Index = ?;
//     `;

//     const VALUES = [data.ID];

//     pool.query(SQLSTATMENT, VALUES, callback);
    
// }


// module.exports.BuyItem = (data,callback) =>
// {
//     const SQLSTATMENT = `
//     UPDATE shop 
//     SET Item_State = 0
//     WHERE Item_Index = ?;    

//     INSERT INTO Locker (Item) VALUES
//     (?);

//     UPDATE Locker 
//     SET Acquired_Date = CURRENT_TIMESTAMP
//     WHERE Inventory_Index = LAST_INSERT_ID();

//     select * FROM Locker;
//     `;

//     const VALUES = [data.ID, data.Item];

//     pool.query(SQLSTATMENT, VALUES, callback);
// }

// module.exports.Locker = (callback) =>{
//     const SQLSTATMENT = `
//     SELECT Item,Acquired_Date FROM locker;`;
//     pool.query(SQLSTATMENT, callback);    
// }





// module.exports.CreditsUpdate = (data,callback) =>{
//     const SQLSTATMENT = `
//     UPDATE credit 
//     SET TotalCredit = ?;
    
//     select * from credit;`;

//     VALUES = [data.credit]
//     pool.query(SQLSTATMENT,VALUES,callback);    
// }

// module.exports.ItemDeduction = (data,callback) =>{
//     const SQLSTATMENT = `
//     UPDATE credit 
//     SET TotalCredit = ?;
    
//     select * from credit;
    
//     INSERT INTO Locker (Item) VALUES
//     (?);

//     UPDATE Locker 
//     SET Acquired_Date = CURRENT_TIMESTAMP
//     WHERE Inventory_Index = LAST_INSERT_ID();`;

//     VALUES = [data.credit, data.item]
//     pool.query(SQLSTATMENT,VALUES,callback);    
// }