const mongoose=require('mongoose');
const { boolean } = require('webidl-conversions');

const productSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,'product name is required']
    },
    price:{
        type:Number,
        required:[true,'product price is required']
    },
    featured:{
        type:Boolean,
        default:false
    },
    rating:{
        type:Number,
        default:4.5
    },
    createdAt:{
        type:Date,
        default:Date.now()
    },
    company:{
        type:String,
        enum:{values:['ikea','liddy','caressa','marcos'],  // enum means the value of company must be among the among not outside of it
            message:'{VALUE} is not supported'
    }
    }
})

module.exports=mongoose.model('Product',productSchema)