let collection = require('../modles/cat');

const postCat = (req,res) => {
    let cat = req.body;
    collection.postCat( cat,(err,result) => {
        if (!err) {
            res.json({statuscode:201,data:result,message:'success'});
       }

    })
}


const getAllCats = (req,res) => {
    let cat = req.body;
    collection.getAllCats( cat,(err,result) => {
        if (!err) {
            res.json({statuscode:201,data:result,message:'success'});
       }

    })
}

module.exports = {postCat,getAllCats}