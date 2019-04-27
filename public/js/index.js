// MODULE NOT REQUIRE TO LOAD/IMPORT
// This index.js is load into index.html which had imported socket.io lib via script tag

// CLIENT

var socket = io()  //io() method access from library

//listen to an event (connect/disconnect client)
socket.on('connect', function(){
    console.log('Connected to server')// @browser dev tool console
//EMIT - CUSTOM EVENT (Client->Server)
    socket.emit('createMessage',{ //object data
        from:"User1_Andrew@example.com",
        text:"Hey Server, this is User1_Andrew (create Message)"
    })

    /* 
//EMIT - CUSTOM EVENT (Client->Server->OTHER Client?)
    socket.emit('createEmail',{
        to:"User2_jen@example.com",
        text:"Hey, this is User1_Andrew (create Email)"
    }) */
})



socket.on('disconnect',function() {
    console.log('Disconnected from server')// @browser dev tool console
})

//EMIT - CUSTOM EVENT

//NewMessage- listen (Server->Client) an custom event from server
socket.on('newMessage',function(message){
    console.log('NewMessage',message)// @browser dev tool console
})

/* 
//NewEmail listen (Server->Client) an custom event from server(newEmail) 
socket.on('newEmail',function(email){
    console.log('NewEmail',email)// @browser dev tool console
})
 */
