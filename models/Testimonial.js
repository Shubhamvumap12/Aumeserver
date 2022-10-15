

const mongoose = require('mongoose');

let testimonialSchema = mongoose.Schema({
    testimonialid:{
        type:Number,
        required: 'Enter ID'
    },
    customername:{
        type:String,
        required:'Customer name is required !'
    },
    occupation:{
        type:String
    },
    propertyname:{
        type:String,
        required: 'Property name is required !'
    },
    customerdesc:{
        type:String
    },
    customersat:{
        type:String,
        required:'Satisfaction is required !'
    }

});

const testimonial = mongoose.model("product", testimonialSchema);

module.exports = testimonial;

