const users=require("../model/userModel")
const jwt=require("jsonwebtoken")
const bcrypt=require("bcrypt")

//register
exports.userRegisterController=async(req,res)=>{
    console.log("Inside User Register Controller ");

    const {username,email,password}=req.body
    console.log(username,email,password);
    

    //logic
    try {
         const existingUser=await users.findOne({email})
      if(existingUser){
        res.status(404).json("User Already Exist Please Login....")
      }else{
          const encryptedpassword=await bcrypt.hash(password,10)
          console.log(encryptedpassword);
          

         const newUser =new users({
            username,email,password:encryptedpassword
         })
         await newUser.save()
         res.status(200).json(newUser)
      }


    } catch (error) {
        res.status(500).json(error)
        
    }
    
}

//login
exports.userLoginController=async(req,res)=>{
    console.log("Inside usser Login Controller");
    const {email,password}=req.body
    console.log(email,password);
    

    try {
         const existingUser=await users.findOne({email})
         if(existingUser){
            let isUserLoggedIn=await bcrypt.compare(password,existingUser.password)
            if(isUserLoggedIn){
                const token=jwt.sign({userMail:existingUser.email,role:existingUser.role},process.env.JWT_SECRET_KEY)
                res.status(200).json({existingUser,token})
            }else{
                res.status(401).json("Invalid Credentials")
            }
         }else{
            res.status(404).json("User Not Found Please Register ")
         }  

    } catch (error) {
        res.status(500).json(error)
    }
    

}