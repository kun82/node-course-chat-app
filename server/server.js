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

//register an event listener (listen event i.e. 'connection'/'disconnect')
io.on('connection',(socket)=>{ // listen to new 'connection'(i.e. client browser on)
    console.log('New user connected') // @terminal console
    // 1st arg- must be extact ('Name') specific in public/index.js socket.emit('Name')
    // 2nd arg- desired input i.e. Object/boolean/string/Number. public/index.js need to be modified
        //CreateMessage event- Listen (Client->Server)

//CHALLENGE -socket.emit from Admin, text welcome to chatapp
        socket.emit ('newMessage',{ from:'Admin',text:"Welcome to Chat App,",createAt:new Date().getTime()})
            
 //CHALLENGE - socket.broadcast.emit from admin, text'new user joined
        socket.broadcast.emit ('newMessage',{ from:'Admin',text:"new user joined", createAt:new Date().getTime() })


        socket.on('createMessage',(message)=>{
            console.log('createMessage: ', message) // @terminal console

//BROADCASTING EVENTS 
    //*socket.broadcast.emit send message to ALL except SELF
        // ie: socket.broadcast.emit('newMessage',{from: message.from,text: message.text, createAt: new Date().getTime()})
    // *io.emit (multi connect) vs socket.emit (emit an event single connect)
        // ie: io.emit('newMessage',{from: message.from,text: message.text, createAt: new Date().getTime()})

        })

    socket.on('disconnect',()=>{ //listen to 'disconnect'(i.e. client browser close/exit)
        console.log('User was disconnected from server') // @terminal console
    })
})


//PORT 
server.listen(port,()=>{  //call back to print display
    console.log(`Connected to Server Port no: ${port}`)
})