const mongoose = require("mongoose");
const RecepieCreatingDataModel = new mongoose.Schema({
    image: {
        name: String,
        filePath: String,
        contentType: String,
    },
    price:{
        type:Number,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    recepie:{
        type:String,
        required:true
    },
    allergents:{
        type:[{type:String}],
    },
    Bought: {
        type: Number,
    },
    Income: {
        type: Number,
    }
})
const RecepieCreatingDataModel_1 = mongoose.model('CreatedDetails',RecepieCreatingDataModel)
module.exports ={ RecepieCreatingDataModel_1};