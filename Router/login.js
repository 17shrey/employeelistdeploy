const express = require ("express");
const mongoose = require("mongoose")
app=express();
app.use(express.json());
const User =require("../model/signup");


app.get("/gate",(req,res)=>{
    res.send("okay all is working fine.")
})

// app.get("/",(req,res)=>{
//     res.send("all is working.")
// })

app.post("/signup",async(req,res)=>{
    const{f_sno,f_userName,f_Pwd}=req.body;
    console.log("check2")
    if(!f_sno || !f_userName || !f_Pwd){
        console.log("check1")

        return res.status(422).json({ error: "Please fill all mandatory fields" });
    }
    try{
        console.log("check3")
        const userNameExist= await User.findOne({f_userName:f_userName})
        if(userNameExist){
            return res.status(422).json({ error: " This User Name is already exist. Please choose another User Name." });
        }else{
            console.log("check4")
            const user = new User({f_sno,f_userName,f_Pwd})
            await user.save();
            return res.status(202).json({ success: "User saved successfully." });
        }
    }catch(err){
        console.log(err);
    };

})

app.post("/signin", async (req, res) => {
    const { f_userName, f_Pwd } = req.body;
    if (!f_userName || !f_Pwd) {
        return res.status(422).json({ error: "Please fill all mandatory fields" });
    }

    try {
        const user = await User.findOne({ f_userName: f_userName });
        if (!user) {
            return res.status(422).json({ error: "User not found" });
        }

        const isMatched = f_Pwd === user.f_Pwd;
        if (isMatched) {
            return res.status(202).json({ message: "User logged in successfully." });
        } else {
            return res.status(422).json({ error: "Please enter correct password." });
        }
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Internal Server Error" });
    }
});


// app.post("/signin", async (req,res) => {
//     console.log("entry10")
//     const {f_userName,f_Pwd}=req.body;
//     if(!f_userName || !f_Pwd ){
//         return res.status(422).json({ error: "Please fill all mandatory fields" });
//     }

//     try{
//         console.log("entry 12")
//         const userNameExist= await User.findOne({f_userName:f_userName})
//         if(userNameExist){
//             const isMatched = await f_Pwd == userNameExist.f_Pwd
//             if(isMatched){
//                 return res.status(202).json({ success: "Logged in successfull." });
//             }else{
//                 return res.status(422).json({ error: "Please enter correct password." });
//             }
//         }else{
//             return res.status(422).json({ error: "Please fill all mandatory fields" }); 
//         }
//     }catch(err){
//         console.log(err)
//     }

// })




module.exports= app;