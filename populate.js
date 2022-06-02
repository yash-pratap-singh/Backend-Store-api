require('dotenv').config();

const connectDB=require('./db/connect');
const { deleteMany } = require('./model/product');
const Product=require('./model/product');

const jsonProducts=require('./products.json');

const start=async()=>{
    try{
        await connectDB(process.env.MONGO_URI);
        await Product.deleteMany();  // Delete all the data from database
        await Product.create(jsonProducts);
        console.log('Success!!!!');
        process.exit(0);                // Automatically exits the process from terminal
    }
    catch(err){
        console.log(err);
        process.exit(1);
    }
}
start();