//PASSING ROOM DATA
 
//validation if it is a string
var isRealString = (str)=>{
    //return TRUE for 'string' value, string is trim and length more than zero
    return typeof str  === 'string' && str.trim().length >0
} 

module.exports={isRealString:isRealString}