require('dotenv').config();

const express=require('express');
const app =express();
const port=process.env.PORT||3000;
const connectDB=require('./db/connect');
const productRouter=require('./routes/product');

// middlewares
app.use(express.json()); 


// routes
app.get('/',(req,res)=>{
    res.send('<h1>Store API</h1><a href="/api/v1/products">Product Route</a>');
})

app.use('/api/v1/products',productRouter);

const start=async()=>{
    try{
        await connectDB(process.env.MONGO_URI);
    app.listen(port,console.log(`Server is Running on PORT ${port}`));
    }catch(err){
        console.log(err);
    }
}
start();