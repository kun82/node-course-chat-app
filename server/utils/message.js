var moment =require('moment')
var someTimestamp = moment().valueOf()

// create function (take in 2 agrs 'from' & 'text')
var generateMessage = (from,text)=>{
    return { //return an object with 3 properties
        from,
        text,
        createAt: someTimestamp
    }
}

// create function (take in 3 agrs FROM, LAT & LONG)
var generateLocationMessage = (from,latitude,longitude)=>{
    return { //return an object with 3 properties
        from,
        url:`https://www.google.com/maps?q=${latitude},${longitude}`,  // return website
        createAt: someTimestamp
    }
}

//export this module/function
module.exports = {generateMessage,generateLocationMessage}