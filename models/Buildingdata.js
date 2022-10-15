const mongoose = require("mongoose");

// Creating Product Schema:-

const BuildingData = new mongoose.Schema(

{
    propertyid: {
        type:Number,
     
    },
    propertyname:{
        type:String,
        required:'Property name is required !'
    },
    propertyimg:{
     type:String,
    },
    propertystatus:{
        type:String, 
    },
    propertytype:{
        type:String,
        required:'Type is required'
    },
    propertybhk:{
        type:String,
    },
    bed:{
        type:Number
    },
    washroom:{
      type:Number
    },
    area:{
        type:Number,
        type:String,
        required: 'Area is required'
    },
    // price:{
    //     type:Number,
       
    // },
    location:{
        type:String,
        required: 'Location is required'
    }
},
  {
    versionKey: false,
    timestamps:true
  }

);

const Product = mongoose.model("buildingdata", BuildingData);

module.exports = Product;
