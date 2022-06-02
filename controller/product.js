const Product =require('../model/product');

const getAllProductsStatic=async(req,res)=>{
    // const search ='A';
    const product= await Product.find({
        price:{$gt:30}
        // name:{$regex:search, $options:'i'}      // i in options means case insensitive
    })
    // .limit(44).skip(5);
    .sort('price')
    .select('name price');
    res.status(200).json({product,nbHits:product.length});
}




const getAllProducts=async(req,res)=>{
try{
    const {featured,company,name,sort,fields}=req.query;
    const queryObject={};
    if(featured){
        queryObject.featured= featured==='true'?true:false;
    }
    if(company)
    {
        queryObject.company= {$regex:company,$options:'i'};
    }
    if(name)
    {
        queryObject.name= {$regex:name,$options:'i'};
    }
    console.log(queryObject);
    let result= Product.find(queryObject);

    // sort
    if(sort){
        // If there are multiple sort options like sort= name,-price then convert them to array by removing comma
        const sortList=sort.split(',').join(' ');
        result=result.sort(sortList);
    }
    else{
        result=result.sort('createdAt');
    }

    // Fields select
    if(fields)
    {
        const fieldList=fields.split(',').join(' ');
        result=result.select(fieldList);
    }

     // Pages       Example 23 items and limit is 7 items per page therefore Items in page1=7, page2=7, page3=7,page4=2
     const page=Number(req.query.page)||1;
     const limit=Number(req.query.limit)||10;
     const skip = (page-1)*limit;
     result=result.skip(skip).limit(limit);


    const product= await result;
    res.status(200).json({product,nbHits:product.length});}
    catch(err){
        console.log(err);
    }

}

module.exports={
    getAllProducts,getAllProductsStatic
}