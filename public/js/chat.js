// MODULE NOT REQUIRE TO LOAD/IMPORT
// This index.js is load into index.html which had imported socket.io lib via script tag src=""

// CLIENT
var socket = io()  //io() method access from library

//AUTOSCROLLING 
//function allow user to read history text when new messages recieved within a threshold
// and when its near bottom it will display new recieved message
function scrollToBottom(){ 
    //selectors
    var messages = jQuery('#messages')
    var newMessage = messages.children('li:last-child') //last-child (list item) modifier
    //heights
//.prop() method gets the property value for only the first element in the matched set.
    var clientHeight = messages.prop ('clientHeight') 
    var scrollTop = messages.prop ('scrollTop')
    var scrollHeight = messages.prop ('scrollHeight')
// .innerHeight() get the current computed height for the first element in the set of matched elements, including padding but not border.
    var newMessageHeight = newMessage.innerHeight()
    var lastMessageHeight = newMessage.prev().innerHeight()
//Get the current computed height for the first element in the set of matched elements, including padding but not border.
    if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight){
        messages.scrollTop(scrollHeight);
    }
}

//listen to an event (connect/disconnect client)
socket.on('connect', function(){
    //console.log('Connected to server')// @browser dev tool console
    var params = jQuery.deparam(window.location.search)

    socket.emit('join', params, function(err){
        if(err){
            alert(err) // popup alert box @browser
            window.location.href = '/'
        }else{
            console.log('No error')
        }
    })
})

socket.on('disconnect',function() {
    console.log('Disconnected from server')// @browser dev tool console
})

//WIRING UP USER LIST
//updateUser List - Listen (from Server-->Client)
socket.on('updateUserList',function(users){
    var ol = jQuery('<ol></ol>') // order list tag
     users.forEach(function(user){ //iteration for adding users
        ol.append(jQuery('<li></li>').text(user)) // create a new list item for each user
    })
    jQuery('#users').html(ol)

    console.log('Users list ', users)
})



//PRINTING MOMENT TIMESTAMPS using moment module
//NewMessage Event- Listen (from Server-->Client) - using mustache render more scalable
socket.on('newMessage',function(message){
    var formattedTime = moment(message.createdAt).format('h:mm a')//using moment to format time
    var template = jQuery('#message-template').html();
    var html = Mustache.render(template,{
        text:message.text,
        from:message.from,
        createdAt: formattedTime
    })

    jQuery('#messages').append(html)
    //function scrollToBottom
    scrollToBottom()
        

/*
    var formattedTime = moment(message.createdAt).format('h:mm a')//using moment to format time
 //   console.log('NewMessage',message)// @browser dev tool console
    var li = jQuery('<li></li>') //create a list item "li"
    li.text(`${message.from} ${formattedTime}: ${message.text}`)

    jQuery("#messages").append(li) // append will add the messages display
*/
})
//GEOLOCATION 
// listen Newlocation message(from Server-->Client) - using mustache render more scalable
socket.on('newLocationMessage',function(message){ //pass in data from Server (declared message)
    var formattedTime = moment(message.createdAt).format('h:mm a')//using moment to format time
    var template = jQuery('#location-message-template').html(); //Get the HTML contents of the first element in the set of matched elements.
    var html = Mustache.render(template,{ //render the location data
        from:message.from,
        url:message.url,
        createdAt: formattedTime
    })
    jQuery('#messages').append(html)
    //function scrollToBottom
    scrollToBottom()
/*     
    var formattedTime = moment(message.createdAt).format('h:mm a')//using moment to format time
    var li = jQuery('<li></li>') //create a LIST item "li"
    //create Anchor tag "a", target set to "_blank" open url in new browser tab
    var a = jQuery('<a target="_blank">My Current Location</a>')
    
    li.text(`${message.from} ${formattedTime}: `)//set the personnal
    a.attr('href',message.url) //fetch Anchor tag Attribute message.url
    li.append(a) // append Anchor tag
    jQuery('#messages').append(li) // append will add the messages display */
})

//jQuery selector with Event Listen
jQuery('#message-form').on('submit', function(e){
    e.preventDefault() // prevent/override default behaviour for the event
    
    var messageTextbox =jQuery('[name=message]')
    //CLIENT--> SERVER)
    socket.emit('createMessage',{
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