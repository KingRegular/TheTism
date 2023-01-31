const express = require("express")
const bodyparser = require("body-parser")
const fs = require("fs")
const app = express()
app.use(express.static("client"))
app.use(bodyparser.urlencoded({extended:false}))
app.use(express.json())

function validateFiles()
{
    if(!fs.existsSync("saving.json")){
        fs.writeFileSync("saving.json",JSON.stringify({"commentIndex":0}))
    }

}

app.post("/postcomment", function(req, resp){
    try{
        let comm = req.body["Comment"]
        let usern = req.body["Username"]
        let data =  JSON.parse(fs.readFileSync("saving.json", "utf-8"))    
        data.commentIndex += 1
        console.log(data)
        let newObject = {
            "Username": usern,
            "Comment": comm
        }
        data["comment"+data.commentIndex.toString()] = newObject
        console.log(data)
        fs.writeFileSync("saving.json", JSON.stringify(data))
        resp.send({"commentIndex": data.commentIndex})
    }
    catch(err){
        console.log(err)
        resp.sendStatus(500)
    }
})

app.get("/getstuff", function(_req, resp){
    try{
        let data =  JSON.parse(fs.readFileSync("saving.json", "utf-8"))
        resp.send(data)
    }
    catch(err){
        console.log(err)
        resp.status(500)
    }     
})

app.get("/getbyindex/:index", function(req, resp){
    try{
        let data =  JSON.parse(fs.readFileSync("saving.json", "utf-8"))
        let index = req.params.index
        resp.send(data["comment"+index])
    }
    catch(err){
        console.log(err)
        resp.status(500)
    }
})

validateFiles()
app.listen(8090)

