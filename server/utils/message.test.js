//MODULE

var expect =require('expect')
var {generateMessage,generateLocationMessage} = require ('./message.js')

describe('generateMessage',()=>{
    it('should generate correct message object',()=>{ //SYNCE test, (done) NOT REQUIRE
        var test_from = "abc" //store res in variable
        var test_text = 'this is a test message' //store res in variable
        var message = generateMessage (test_from,test_text) 
        expect(typeof message.createAt).toBe('number') //assert createAt is number
        expect(message).toMatchObject({
            from: test_from, //assert form match
            text: test_text  //assert text match
        }) 
    })
})

describe('generateLocationMessage',()=>{ //SYNC test hence (done) not required
    it('should generate correct location object',()=>{
        var from = "Admin_Test" //store res in variable
        var lat = 1111 //store res in variable
        var long = 2222//store res in variable  
        var url= 'https://www.google.com/maps?q=1111,2222'      
        var message = generateLocationMessage (from,lat,long)
        expect(typeof message.createAt).toBe('number') //assert createAt is number
        expect(message).toMatchObject({from,url})  //
    })

})