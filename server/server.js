/*CREATE GIT REPOSITORY (IF REQUIRE): 
 GIT HUB LOGIN> NEW> RESPOSITORY NAME >CREATE REPOSITORY > follow instructions on web
*/

/*DEPLOY TO HEROKU (IF REQUIRE) on terminal:
>heroku create > git push heroku master

*/
//MODULE
const path = require ('path') //bulit in module
const http = require ('http') //bulit in module
const express = require('express')
const socketIO = require('socket.io')

const publicPath = path.join(__dirname,'../public') // go straight into the directory
const port = process.env.PORT || 3000
const app = express() // create Express application, express() is a top level function exported by express module
var server = http.createServer(app) // create server using http library - (app) as the agrument
var io = socketIO(server)  // configure the server to use socketIO

//configure express.static middleware
app.use(express.static(publicPath))

//register an event listener
io.on('connection',(socket)=>{ // listen to new 'connection'
    console.log('New user connected') // message display evertime new user connected

    
    socket.on('disconnect',()=>{
        console.log('User was disconnected from server')
    })
})


//PORT 
server.listen(port,()=>{  //call back to print display
    console.log(`Connected to Server Port no: ${port}`)
})