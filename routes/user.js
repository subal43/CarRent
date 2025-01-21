const express = require ("express")
const router = express.Router();
const jwt = require("jsonwebtoken")
const {User} = require("../db")
const {z} = require("zod");
// import bcript from "bcrypt"

const JWT_SECRET = require("../config");


const signupBody=z.object({
    username:z.string().email(),
    firstName:z.string(),
    lastName:z.string(),
    password:z.string()
})


router.post("/signup",async (req,res)=>{
    const {success}=signupBody.safeParse(req.body)
    if(!success){
        return res.status(411).json({
            message: "Incorrect inputs"
        })
    }

    const userExist = await User.findOne(
       { username : req.body.username}
    )

    if(userExist){
        return res.status(411).json({
            message: "Email already taken "
        })
    }
    // const password = req.body.password;
    // const salt = bcript.genSaltSync(10);
    // const hash = await bcript.hash(password,salt)
    const user = await User.create({
        userName:req.body.username,
        password:req.body.password,
        firstName:req.body.firstName,
        lastName:req.body.lastName
    })
    const userid = user._id ;
    
    const token = jwt.sign({
        userid
    },JWT_SECRET)

    res.json({
        	message: "User created successfully",
	        token:token
    })


})

const signinBody = z.object({
    userName:z.string().email(),
    password:z.string()
})


router.post("/signin",async(req,res)=>{
    try{
    const {success} = signinBody.safeParse(req.body)
    if(!success){
        alert("Incorrect inputs")
        return res.status(411).json({
            message: "Incorrect inputs"
            
        })
        
    }
    
    
    const user = await User.findOne({
        userName : req.body.userName,
        password:req.body.password
        
    })
   
    if(!user){
        alert("User does not exist")
        return res.status(401).json({
            msg:"User does not exist"
        })
    }
    const token = jwt.sign({
        userId : user._id
    },JWT_SECRET)


        return res.status(200).json({
            token
        })
        
    }
    catch(error){
        alert("Error while logging in ")
    res.status(411).json({
        message: "Error while logging in "
    })
    }


})
module.exports = router;