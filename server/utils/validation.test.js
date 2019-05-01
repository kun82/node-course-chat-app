const expect =require('expect')
var {isRealString} = require ('./validation.js')//import isRealString



describe('isRealString',()=>{ 
// should reject non-string values
    it('should reject non-string values',()=>{
        var test_nonString = isRealString(1234) // set as number
        expect(test_nonString).toBe(false)   
    })

// should reject string with ONLY spaces
    it('should reject string with ONLY spaces',()=>{
        var test_onlySpace =isRealString('   ') // set as space
        expect(test_onlySpace).toBe(false)  
    }) 

// should allow string with non-space characters
    it('should allow string with non-space characters',()=>{
    var test_string = isRealString(' vvabcd 1234 ') // set valid string
    expect(test_string).toBe(true)   
    })
})