//MODULE

var expect =require('expect')
var {generateMessage} = require ('./message.js')

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