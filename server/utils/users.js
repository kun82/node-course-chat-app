//STORING USERS USING ES6 CLASSES SYNTAX
//Array of objects

// A constructor in Java is a special method that is used to initialize objects. 
//  The constructor is called when an object of a class is created. 
// It can be used to set initial values for object attributes:



//create Users class
class Users {
    //constructor function
    constructor(){
        this.users = []; 
    }
// addUser (id,name,room) method
    addUser (id,name,room){
        var user ={id, name, room}
        this.users.push(user)
        return(user) //return successfully created user
        //push() method adds a new item to the end of an array & returns the new length of an array. it changes the length of the array or collection
    }
// removeUser (id) method
    removeUser(id){ // return user that was removed
        var user = this.getUser(id)

        if (user) {// if user exist, we going to remove from list
            this.users = this.users.filter((user)=> user.id !== id)
        }
        return user;
    }

// getUser(id) method
    getUser(id){ //Return TRUE if the agr (id) is equal user.id property 
        return this.users.filter((user)=>user.id === id)[0]
    }   

// getUserlist(room) method
    getUserList(room){
        var users= this.users.filter((user)=>{
            return user.room === room
        }) //return TRUE if match
        var namesArray= users.map((user)=>{
            return user.name
        }) // return user.name  
        return namesArray
    }
}

module.exports={Users:Users}


/* 
//create Person class
class Person {
    //constructor function
    constructor(name,age){ 
        this.name = name
        this.age = age
    }
    //getUserDescription function
    getUserDescription(){
        return `${this.name} is ${this.age} years old`
    }
}
var me = new Person('Andrew',25) //pass in 2 agruments
var description = me.getUserDescription()//call function
console.log(description)// display: "Andrew is 25 years old" */
