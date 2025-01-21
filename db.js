const mongoose = require("mongoose");
const Schema = mongoose.Schema;

mongoose.connect("mongodb+srv://subalkundu3:zsCa4gcKCBC4DbUA@cluster0.il9x56g.mongodb.net/quickcab")

const UserSchema = new Schema({
    firstName:String,
    lastName:String,
    password:String,
    userName:String

})

const bookingSchema =  new Schema({
    userid : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true
    },
    day:String,
    car:String,
    ph:Number,
    Service:String,
})

const Booking = mongoose.model("Book",bookingSchema);
const User = mongoose.model("User",UserSchema);

module.exports= {
    User,
    Booking
    
};
