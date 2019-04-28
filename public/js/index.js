// MODULE NOT REQUIRE TO LOAD/IMPORT
// This index.js is load into index.html which had imported socket.io lib via script tag

// CLIENT

var socket = io()  //io() method access from library

//listen to an event (connect/disconnect client)
socket.on('connect', function(){
    console.log('Connected to server')// @browser dev tool console
})

socket.on('disconnect',function() {
    console.log('Disconnected from server')// @browser dev tool console
})

//NewMessage Event- Listen (Server-->Client)
socket.on('newMessage',function(message){
    console.log('NewMessage',message)// @browser dev tool console
})

