fetch('allUsers.json')
.then(res=>res.json)
.then(data=>cleanData(data))

function cleanData(allUsers){
    expUsers = []
    for (user in allUsers){
        if (typeof(user.experience)=='object'){
            expUsers.push(user)
        }
    }
}