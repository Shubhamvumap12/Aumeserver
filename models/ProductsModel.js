const mongoose = require("mongoose");

// Creating Product Schema:-

const productSchema = new mongoose.Schema(
{
    uploaded_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    own_type:{
        type:String,
        required:'owning type is required !'
    },
    property_name:{
        type:String,
        required:'property name is required !'
    },
    floors:{
        type:String,        
    },
    build_type:{
        type:String,        
    },
    buid_specifications:{
        type:String,        
    },
    property_status:{
        type:String,        
    },
    carpet_area:{
        type:String,        
    },
    age:{
        type:String,        
    },
    overall_rating:{
        type:String,        
    },
    bed:{
        type:String,        
    },
    bath:{
        type:String,        
        default: 1,
    },
    architect:{
        type:String,        
    },
    class:{
        type:String,        
    },
    availability:{
        type:String,        
    },
    maintainance_cost:{
        type:String,        
    },
    year_of_completion:{
        type:String,        
    },
    super_area:{
        type:String,        
    },
    property_type:{
        type:String,        
    },
    regulatory_id:{
        type:String,        
    },
    occupancy:{
        type:String,        
    },
    builder:{
        type:String,        
    },
    amenities:{
        type:Array,        
    },
    images:{
        type:Array,        
    },
    address:{
        type:String,        
    },
    plot_area:{
        type:String,
    },
    face_direction:{
        type:String,
    },
    price:{
        type:Number,
        // required:'Price is required'
    },
    location:{
        type:String,
        required: 'Location is required'
    },
    gym:{
        type:String,
    }
},
  {
    versionKey: false,
    timestamps: true,
  }
);

const Product = mongoose.model("product", productSchema);

module.exports = Product;
