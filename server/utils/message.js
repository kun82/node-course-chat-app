
// create function (take in 2 agrs 'from' & 'text')
var generateMessage = (from,text)=>{
    return { //return an object with 3 properties
        from,
        text,
        createAt: new Date().getTime()
    }
}

//export this module/function
module.exports = {generateMessage:generateMessage}