//STORING USERS USING ES6 CLASSES SYNTAX
//TEST
const expect =require('expect')
const {Users} = require('./users')

describe('Users',()=>{
    var users;

    // Perform first
    beforeEach(()=>{
        be_test_users =new Users()
        be_test_users.users=[{ //set 3 array objects for test
            id:'1',
            name:'nike',
            room:'Room A'
        },{
            id:'2',
            name:'brooks',
            room:'Room B'
        },{
            id:'3',
            name:'reebok',
            room:'Room A'
        }]
    })

//TEST ADD NEW USERS
    it('should add new users',()=>{ //SYNC Function
        var test_users= new Users() //call User class
        var user = {  //create user object & its property
            id: '12345a',
            name:'Heman',
            room:'test room'
        }
        //store the respond from Users()
        var resUser = test_users.addUser(user.id,user.name,user.room)
        expect(test_users.users).toEqual([user])
    })

//TEST REMOVE USERS LIST IN ROOM
    it('should REMOVE a user',()=>{ //SYNC Function
        var test_userId = '1' //set valid id
        var user = be_test_users.removeUser(test_userId)

        expect(user.id).toBe(test_userId)
        expect( be_test_users.users.length).toBe(2)

    })
//TEST IT SHOULD NOT REMOVE USERS LIST IN ROOM
    it('should NOT REMOVE a user',()=>{ //SYNC Function
        var test_userId = '99' //set invalid id
        var user = be_test_users.removeUser(test_userId)

        expect(user).toBeFalsy() //expect user does not exist
        expect( be_test_users.users.length).toBe(3)  //expect lenght is remain 3

    })


//TEST IT SHOULD FIND USERS LIST IN ROOM
    it('should FIND a user',()=>{ //SYNC Function
        var test_userId = '2' //use valid id
        var user = be_test_users.getUser(test_userId)
        expect(user.id).toBe(test_userId)

    })

//TEST IT SHOULD NOT FIND USERS LIST IN ROOM
    it('should NOT FIND a user',()=>{ //SYNC Function
        var test_userId = '999' //use valid id
        var user = be_test_users.getUser(test_userId)
        expect(user).toBeFalsy() //expect user donotExist
    })


//TEST GET USERS LIST IN ROOM
    it('should return names THOSE in room A',()=>{ //SYNC Function
        var userList = be_test_users.getUserList('Room A')
        expect(userList).toEqual(['nike','reebok'])
    
    })
})