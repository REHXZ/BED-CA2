//////////////////////////////////////////////////////
// REQUIRE MODULES
//////////////////////////////////////////////////////
const model = require("../models/GameModel");


module.exports.TotalTasks = (req, res) => {
    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error createMessage:", error);
            res.status(500).json(error);
        } else {
            res.status(201).json(results);
        }
    }
    
    model.TotalTasks(callback);
}


module.exports.TotalCredit = (req, res) => {
    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error createMessage:", error);
            res.status(500).json(error);
        } else {
            res.status(201).json(results);
        }
    }
    
    model.TotalCredit(callback);
}

//////////////////////////////////////////////////////
// GET ALL PLAYERS BY USER
//////////////////////////////////////////////////////
module.exports.SendCredits = (req, res, next) => {
    if(req.body.total_credits == null){return res.status(400).send("Message is empty");}
    else if(res.locals.userId == undefined){return res.status(400).json({"error":"No user is Logged in"});}

    const data = {
        points:req.body.points,
        total_credits: req.body.total_credits,
        user_id: res.locals.userId
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error createMessage:", error);
            res.status(500).json(error);
        } else {
            res.status(201).json(results);
        }
    }
    
    model.insertSingle(data, callback);
}

module.exports.UpdateCredit = (req, res, next) => {
    if(req.body.total_credits == null){return res.status(400).send("Message is empty");}
    else if(res.locals.userId == undefined){return res.status(400).json({"error":"No user is Logged in"});}

    const data = {
        total_credits: req.body.total_credits,
        user_id: res.locals.userId
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error createMessage:", error);
            res.status(500).json(error);
        } else {
            res.status(201).json(results);
        }
    }
    
    model.UpdateCredit(data, callback);
}