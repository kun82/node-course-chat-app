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

//GEOLOCATION 
// listen Newlocation message(from Server-->Client)
socket.on('newLocationMessage',function(message){ //pass in data from Server (declared message)
    var li = jQuery('<li></li>') //create a LIST item "li"
    //create Anchor tag "a", target set to _blank open url in new browser tab
    var a = jQuery('<a target="_blank">My Current Location</a>')
    
    li.text(`${message.from}: `)//set the personnal
    a.attr('href',message.url) //fetch Anchor tag Attribute message.url
    li.append(a) // append Anchor tag
    jQuery('#messages').append(li) // append will add the messages display
})

//jQuery selector with Event Listen
jQuery('#message-form').on('submit', function(e){
    e.preventDefault() // prevent/override default behaviour for the event
    
    var messageTextbox =jQuery('[name=message]')
    //CLIENT--> SERVER)
    socket.emit('createMessage',{
        from:'User',
        text: messageTextbox.val()//select an element name = "message"
    },function(){
        messageTextbox.val('')//clear val using val('')

    })
})

//GEOLOCATION , access web api NAVIGATOR via https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API
var locationButton = jQuery('#send-location')
// Listen event - 'Click' lister event
locationButton.on('click', function() { // must use 'click' inorder to work
    if(!navigator.geolocation){ //if NO Geolocation Object at navigator
        return alert('Geolocation not supported by your browser') //popup default alert box @browser
    }

    //disabled the button after click "send location" & display sending text
    locationButton.attr('disabled','disabled').text('Sending Location....')
    
    //else access the navigator for current location
    navigator.geolocation.getCurrentPosition (function(position){
         //removed "disabled button" attribute & display send text
        locationButton.removeAttr('disabled').text('Send Location') 
            socket.emit('createLocationMessage',{ //CLIENT--> SERVER)
            latitude:position.coords.latitude, //object x-refer to devtools console
            longitude:position.coords.longitude
        })
    },function(){ //error handler
        //removed "disabled button" attribute & display send text
        locationButton.removeAttr('disabled').text('Send Location')
        alert('Unable to fetch location') //popup default alert box @browser
    })
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