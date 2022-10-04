const mongoose = require("mongoose");

// Creating Product Schema:-

const productSchema = new mongoose.Schema(
{
    propertyid:{
        type:Number,
        // required: 'Enter ID'
    },
    propertyimg:{
        type:String,
        
    },
    propertyname:{
        type:String,
        required:'Property name is required !'
    },
    propertystatus:{
        type:String,
        
    },
    propertytype:{
        type:String,
    },
    propertybhk:{
        type:String,
       
    },
    area:{
        type:String,
        required: 'Area is required'
    },
    price:{
        type:Number,
        // required:'Price is required'
    },
    location:{
        type:String,
        required: 'Location is required'
    }
},
  {
    versionKey: false,
  }
);

const Product = mongoose.model("product", productSchema);

module.exports = Product;
