//CREATE GIT REPOSITORY (IF REQUIRE): 
// LOGIN> NEW> RESPOSITORY NAME >CREATE REPOSITORY > follow instructions on web
//MODULE
const path = require ('path') //bulit in module
const express = require('express')

const publicPath = path.join(__dirname,'../public') // go straight into the directory
const port = process.env.PORT ||3000
const app = express() 

//configure express.static middleware
app.use(express.static(publicPath))

//PORT 
app.listen(port,()=>{  //call back to print display
    console.log(`Connected to Server Port no: ${port}`)
})
