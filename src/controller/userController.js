//////////////////////////////////////////////////////
// REQUIRE MODULES
//////////////////////////////////////////////////////
const model = require("../models/userModel");


module.exports.UpdateUserbyId = (req, res, next) => {
    const data = {
        id: req.params.id,
        username:req.body.username,
        email:req.body.email,
        Auth:req.body.Authorization
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error deleteMessageById:", error);
            res.status(500).json(error);
        } else {
            res.status(200).json(results);
        }
    }

    model.UpdateUserbyId(data, callback);
}


module.exports.deleteUserbyId = (req, res, next) => {
    const data = {
        id: req.params.id
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error deleteMessageById:", error);
            res.status(500).json(error);
        } else {
            res.status(200).json(results);
        }
    }

    model.deleteUserbyId(data, callback);
}



module.exports.TotalUser = (req,res) => {
    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error getAllPlayerFromUser:", error);
            res.status(500).json(error);
        }
        else {
            res.status(200).json(results);
        }
    }

    model.TotalUser(callback);
}




//////////////////////////////////////////////////////
// GET ALL PLAYERS BY USER
//////////////////////////////////////////////////////
module.exports.getAllPlayerFromUser = (req, res, next) => 
{
    if (req.params.userId == undefined) 
    {
        res.status(400).json({
            message: "Error: userId is undefined"
        });
        return;
    }
    else {
        const userData = {
            id: req.params.userId
        }
        model.selectById(userData, (userError, userResults) => {
            if (userResults.length == 0) {
                res.status(404).json({
                    Error: "User does not exist"
                });
            } else {
                const data = {
                    user_id: userData.id
                }
            
                const callback = (error, results, fields) => {
                    if (error) {
                        console.error("Error getAllPlayerFromUser:", error);
                        res.status(500).json(error);
                    }
                    if (results.length == 0) {
                        res.status(404).json({
                            Error: "User is not associated with any players"
                        });
                    }
                    else {
                        res.status(200).json(results);
                    }
                }
            
                model.selectAllPlayerByUser(data, callback);
            }
        });
    }
}

//////////////////////////////////////////////////////
// CONTROLLER FOR LOGIN
//////////////////////////////////////////////////////
module.exports.login = (req, res, next) => {
    if (req.body.username == undefined || req.body.password == undefined) {
        res.status(400).json({
            Error: "username or password is missing"
        });
        return;
    }

    const data = {
        username: req.body.username,
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error login:", error);
            res.status(500).json(error);
        }
        if (results.length == 0) {
            res.status(404).json({
                message: "User not found"
            });
        }
        else {
            res.locals.userId = results[0]["user_id"];
            res.locals.hash = results[0]["password"];
            res.locals.Auth = results[0]["Authorization"]
            next();
        }
    }

    model.selectByUsername(data, callback);
}

//////////////////////////////////////////////////////
// CONTROLLER FOR REGISTER
//////////////////////////////////////////////////////
module.exports.register = (req, res, next) => {
    if (!(req.body.username || req.body.email)) {
        return res.status(400).json({
            Error: "username, email or password is missing"
        });
    }

    const data = {
        username: req.body.username,
        email: req.body.email,
        password: res.locals.hash
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error register:", error);
            res.status(500).json(error);
        }
        else {
            res.locals.userId = results.insertId;
            res.locals.message = `User ${data.username} created successfully.`;
            next();
        }
    }

    model.insertSingle(data, callback);
}

//////////////////////////////////////////////////////
// MIDDLEWARE FOR CHECK IF USERNAME OR EMAIL EXISTS
//////////////////////////////////////////////////////
module.exports.checkUsernameOrEmailExist = (req, res, next) => {
    const data = {
        username: req.body.username,
        email: req.body.email
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error checkUsernameOrEmailExist:", error);
            res.status(500).json(error);
        }
        else{
            if (results.length != 0) {
                res.status(409).json({
                    message: "Username or email already exists"
                });
            }
            else {
                next();
            }
        }
    }

    model.selectByUsernameEmail(data, callback);
    
}

module.exports.readAllUser = (req,res) => {
    const callback = (error,results,fields) => {
        if (error) {
            return res.status(500).send("Internal Server error:" + error)}
        else{
            res.status(201).json(results)
        }
    }
    model.readAllUser(callback)
}

module.exports.readUserById = (req, res) =>
{
    const data = {
        userId: req.params.userId
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error readPlayerById:", error);
            res.status(500).json(error);
        } else {
            if(results.length == 0) 
            {
                res.status(404).json({
                    message: req.params.userId
                });
            }
            else res.status(200).json(results);
        }
    }

    model.selectById(data, callback);
}