// JAN 1ST 1970 00:00:00am GMT

//Import moment
var moment=require('moment')



var someTimestamp = moment().valueOf()
console.log(someTimestamp)
var CreatedAt = 1234
var date = moment(CreatedAt)
date.add(1,'year').subtract(9,'months')
// .format short hand MMM-MONTH YYYY-YEAR
console.log(date.format('MMM Do YYYY Z'))
console.log(date.format('h:mm a'))
console.log(date.format('hh:mm a'))

