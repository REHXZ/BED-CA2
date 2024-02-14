const model = require("../models/LockerModel");

module.exports.InsertLocker = (req,res) => {
    data = {
        user_id:res.locals.userId,
        name:req.body.name
    }
    
    if(!(req.body.name) && !(req.body.image)){
        return res.status(400).json({message:"No Item Selected."})
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Internal Error:", error);
            res.status(500).json(error);
        } 
        else {
            res.status(200).json(results);
        }
    } 

    model.InsertLocker(data,callback);
}


module.exports.ShowLocker = (req,res) => {
    data = {
        user_id:res.locals.userId
    }

    if(!(res.locals.userId)){
        return res.status(400).json({User_ID:"No user Logged in."})
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Internal Error:", error);
            res.status(500).json(error);
        } 
        else {
            const itemNames = results.map(row => row.Item_Name);
            res.status(200).json(itemNames);
        }
    } 

    model.ShowLocker(data,callback);
}