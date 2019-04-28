
// take in 2 agrs 'from' & 'text'
var generateMessage = (from,text)=>{
    return { //return 3 agruments
        from,
        text,
        createAt: new Date().getTime()
    }
}

//export this module/function
module.exports = {generateMessage:generateMessage}