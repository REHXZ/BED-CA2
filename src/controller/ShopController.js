const model = require("../models/ShopModel.js");


module.exports.TotalCredits = (req,res, next) => {
    const data = {
        user_id: res.locals.userId
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
    model.TotalCredits(data,callback);
}

module.exports.TotalWins = (req,res, next) => {
    const data = {
        user_id: res.locals.userId
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
    model.TotalWins(data,callback);
}





// //View the 5 Random Gacha Items from the Shop
// module.exports.ViewTodayShop = (req,res) => {
//     const callback = (error, results, fields) => {
//         //Checking for internl errors
//         if (error) {
//             console.error("Internal Error:", error);
//             res.status(500).json(error);
//         } 
//         //Display the results
//         else res.status(200).json(results);
//     } 
//     model.ViewTodayShop(callback);
// }


// module.exports.ViewItem = (req, res, next) => {
//     //Parameter to view a item
//     data = {
//         ID: req.params.ID
//     }

//     const callback = (error, results, fields) => {
//         if (error) {
//             console.error("Error Task by ID:", error);
//             res.status(500).json(error);
//         } else {
//             //If the params given is not inside the databsae
//             if(results.length == 0) 
//             {
//                 res.status(404).send("Invalid Task Id");
//             }
//             else {
//                 //if the request methodis put 
//                 if (req.method == "PUT"){
//                     //hold the results first array into a res.locals
//                     res.locals.Item = results[0]
//                     //check wether the item they are buying is more than the balance credits they have
//                     if(res.locals.Item['Item_Cost'] > res.locals.credit){
//                         //If the item is more than the users credit, show how much more they need to buy the item
//                         Insufficient = Math.abs(res.locals.Item['Item_Cost'] - res.locals.credit)
//                         res.status(200).json(`You are ${Insufficient} credits Short Adventurer :(, you are currently at ${res.locals.credit} Credits.`)
//                     }
//                     else{
//                         // Fiind the remainig amount to update the users credit and go to the next function
//                         res.locals.LeftOver = res.locals.credit - res.locals.Item['Item_Cost']
//                         next();
//                     }
//                 }
//                 else{
//                     //Display the results
//                     res.status(200).json(results[0])
//                 }
//             }
//         }
//     }
//     model.ViewItem(data, callback);
// }

// module.exports.BuyItem = (req, res, next) => {
//     //Check wether the parameters are empty if they are we return a response
//     if(req.params.ID == undefined)
//     {
//         res.status(400).json("Error: body is not filled");
//         return;
//     }
//     //Parameter to insert into the users Locker
//     const data = {
//         ID: req.params.ID,
//         Item: res.locals.Item["Item_Name"]
//     };

//     const callback = (error, results, fields) => {
//         if (error) {
//             console.error("Error updateUserById:", error);
//             res.status(500).json(error);
//         } else {
//             //If the params given is not inside the databsae
//             if(results.affectedRows == 0) 
//             {
//                 res.status(404).json({
//                     Error: "Item not found"
//                 });
//             }
//             else {
//                 //Display the results
//                 res.status(200).json({Item:`${data.Item} Succesfully Added to Locker`,
//                                      Locker:results[3]});
//             }
//         }
//     }
//     model.BuyItem(data, callback);
// }

// //Stores the players Items
// module.exports.Locker = (req,res) => {
//     const callback = (error, results, fields) => {
//         if (error) {
//             console.error("Internal Error:", error);
//             res.status(500).json(error);
//         } 
//         else {
//             //Checks wether theres anything in the DB
//             if(results.length == 0){
//                 res.status(400).json('Unfortuantely Your Locker is Empty');
//             }
//             else{
//             //returns all the lockers item
//                 res.status(200).json(results);
//             }
//         }
//     } 
//     model.Locker(callback);
// }

// This controller finds the total number of credits a user have and how much left over they have after buying a item from the shop, this works by finding the total number of credits and minusing away the left over and updating the database right after minusing thus staying updated.

// module.exports.CreditsUpdate = (req,res,next) => {
//     //Parameter to Update credits
//     const data = {
//         credit: res.locals.credit
//     };

//     const callback = (error, results, fields) => {
//         if (error) {
//             console.error("Error createNewPlayer:", error);
//             res.status(500).json(error);
//         } else {
//             //go to next function after updating the users credit
//                 next();
//         }
//     }
//     model.CreditsUpdate(data, callback);
// }

// module.exports.ItemDeduction = (req,res,next) => {
//     //Parameter to Update credits and locker
//     data = {
//         credit:res.locals.LeftOver,
//         item:res.locals.Item["Item_Name"]
//     }
//     const callback = (error, results, fields) => {
//         if (error) {
//             console.error("Internal Error:", error);
//             res.status(500).json(error);
//         } 
//         else {
//             //Show what the user bought adn the left over credits
//             res.status(200).json(`After Buying ${res.locals.Item["Item_Name"]} Your left with ${res.locals.LeftOver} Credits Good Luck with you Journey Adventurer`);
//         }
//     } 
//     model.ItemDeduction(data,callback);
// }