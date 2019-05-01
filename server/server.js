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

const{isRealString}= require('./utils/validation')//import this function
const{generateMessage,generateLocationMessage}= require('./utils/message')//import this function
const {Users} = require ('./utils/users')

const publicPath = path.join(__dirname,'../public') // go straight into the directory
const port = process.env.PORT || 3000
const app = express() // create Express application, express() is a top level function exported by express module
var server = http.createServer(app) // create server using http library - (app) as the agrument
var io = socketIO(server)  // configure the server to use socketIO
var users = new Users() // class

//configure express.static middleware
app.use(express.static(publicPath))

//register an event listener (listen event i.e. 'connection'/'disconnect')
io.on('connection',(socket)=>{ // listen to new 'connection'(i.e. client browser on)
    console.log('New user connected') // @terminal console
    // 1st arg- must be extact ('Name') specific in public/index.js socket.emit('Name')
    // 2nd arg- desired input i.e. Object/boolean/string/Number. public/index.js need to be modified

//PASSING ROOM DATA
        socket.on('join',(params,callback)=>{ 
            //validate the params data (name and room name) whether is it a string
            if(!isRealString(params.name) || !isRealString(params.room)) {
                return callback('Name and Room Name are required')
            }
// SOCKET.IO ROOMS
            // .join take the string name(params.room)
            socket.join(params.room)
            users.removeUser(socket.id) // remove user from other rooms and add them in new room
            users.addUser (socket.id, params.name, params.room)//adding user class

            io.to(params.room).emit('updateUserList',users.getUserList(params.room))
            // .leave(params.room), leave the room
            // io.emit -> io.to('roomname').emit
            // socket.broadcast.emit ->socket.broadcast.to('roomname').emit
            // socket.emit  ->socket.to('roomname').emit
    
    //CHALLENGE -EMIT EVENT from Admin-->Client, text welcome to chatapp USING generateMessage()
            socket.emit ('newMessage',generateMessage('Admin','Welcome to chat app'))          
    
    //CHALLENGE -EMIT EVENT from Admin-->Client  
    //Broadcast 'newMessage' to all user in the specific Chat Room when 'new user joined' USING generateMessage()
            socket.broadcast.to(params.room).emit('newMessage',generateMessage('Admin',`${params.name} has joined.`))

                callback() // if valid just callback () -> 'join' at chat.js
        })



 
    //CreateMessage custom Event- Listen (From Client-->Server) and callback function for acknowledgement
        socket.on('createMessage',(message,callback)=>{  
            console.log('createMessage: ', message) // @terminal console
            //(from Server-->Client)
            io.emit('newMessage',generateMessage(message.from,message.text)) //pass in 2 agrs & get 3 argsreturn
            callback()// call the function acknowledgement
        })
//BROADCASTING EVENTS 
        //*socket.broadcast.emit send message to ALL except SELF
            // ie: socket.broadcast.emit('newMessage',{from: message.from,text: message.text, createAt: new Date().getTime()})
         // *io.emit (multi-connect) vs socket.emit (emit an event single connect)
          // ie: io.emit('newMessage',{from: message.from,text: message.text, createAt: new Date().getTime()})

//GEOLCATION        
    //CreateLocationMessage custom Event- Listen (From Client-->Server) and callback function for acknowledgement
    socket.on('createLocationMessage',(coords)=>{ 
        // Emit New location message (from Server-->Client)
        io.emit('newLocationMessage',generateLocationMessage('Admin',coords.latitude, coords.longitude)) //pass in 3 agrs
    })


    socket.on('disconnect',()=>{ //listen to 'disconnect'(i.e. client browser close/exit)
        var user = users.removeUser(socket.id)
        if(user){
            io.to(user.room).emit('updateUserList',users.getUserList(user.room)) //update userList
            io.to(user.room).emit('newMessage',generateMessage('Admin',`${user.name} has left`)) //Print message 
        }
        console.log('User was disconnected from server') // @terminal console
    })
})

//PORT 
server.listen(port,()=>{  //call back to print display
    console.log(`Connected to Server Port no: ${port}`)
})