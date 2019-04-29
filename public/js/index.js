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

//NewMessage Event- Listen (from Server-->Client)
socket.on('newMessage',function(message){
    console.log('NewMessage',message)// @browser dev tool console
    var li = jQuery('<li></li>') //create a list item "li"
    li.text(`${message.from}: ${message.text}`)

    jQuery("#messages").append(li) // append will add the messages display
})

//ACKNOWLEDGEMENTS EVENT - ie acknowledge  valid message/data received
// Emit - CLIENT to SERVER and function ()
/* 
    socket.emit('createMessage', {
    from: 'Client',
    text: 'hi'
},function(data){ //callback() from server.js
    console.log('Message:',data)
}) */

//jQuery selector with Event Listen
jQuery('#message-form').on('submit', function(e){
    e.preventDefault() // prevent/override default behaviour for the event
    //CLIENT--> SERVER)
    socket.emit('createMessage',{
        from:'User',
        text:jQuery('[name=message]').val()//select an element name = "message"
    },function(){


    })
})

