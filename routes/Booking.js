const express = require ("express");
const router = express.Router();
const authMiddleware = require("../middleware/middleware")
const {Booking} = require("../db")
const {z} = require("zod")


const BookingBody = z.object({
    
    day:z.string(),
    car:z.string(),
    ph:z.number(),
    Service:z.string()
})


router.post("/booking",authMiddleware,async(req,res)=>{
    const {success} = BookingBody.safeParse(req.body)

    if(!success){
        return res.status(401).json({
            msg:"Invalid Inputs"
        })
    }

    const book = await Booking.create({
        userid:req.userId,
        day:req.body.day,
        car:req.body.car,
        ph:req.body.ph,
        Service:req.body.Service

    })
     
    if(book){
    return res.status(200).json({
        msg : "Booking is Done"
    })
    }
    else{
        return res.status(401).json({
            msg :"Something is wrong"
        })
    }

    
})

module.exports = router;