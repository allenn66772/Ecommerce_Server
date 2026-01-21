require("dotenv").config()

const express =require("express")

const cors=require("cors")


const router=require("./router")

require("./db/connection")

const estoreServer=express()

estoreServer.use(cors())

estoreServer.use(express.json())

estoreServer.use(router)

const PORT=5000

estoreServer.listen(PORT,()=>{
    console.log(`E-Store server started running at PORt ${PORT}`);
    
})

estoreServer.get("/",(req,res)=>{
    res.status(200).send("e store server started running successfully and waiting for client req")
})