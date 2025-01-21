const JWT_SECRET = require("../config");
const jwt = require("jsonwebtoken")



const authMiddleware =(req,res,next)=>{
 const authHeader = req.headers.authorization;
 

 if(!authHeader.startsWith('Bearer')){
    return res.status(403).json({msg:"Header is Incorrect"});
 }

 const token = authHeader.split(' ')[1];

 try{
    const decoded = jwt.verify(token,JWT_SECRET);
  
    if (decoded.userid){
        req.userId = decoded.userid;
        next();
    }else{
        return res.status(403).json({msg:"wrong header"})
    }
 }catch(err){
    return res.status(403).json({msg:"Something is wrong with Header"})
 }

};

module.exports=authMiddleware;


