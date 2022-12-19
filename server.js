const express = require('express')
const app = express()
const MongoClient = require('mongodb').MongoClient
const cors = require('cors')
const PORT = 8000
require('dotenv').config()


let db,
    dbConnectionStr = process.env.DB_STRING,
    dbName = 'animated-avatar-app'

MongoClient.connect(dbConnectionStr, { useUnifiedTopology: true })
    .then(client => {
        console.log(`Connected to ${dbName} Database`)
        db = client.db(dbName)
        
        app.set('view engine', 'ejs')
        app.use(express.static('public'))
        app.use(express.urlencoded({ extended: true}))
        app.use(express.json())
        app.use(cors())

app.get('/', (request, response)=>{
    db.collection('avatars').find().sort({likes:-1}).toArray()
    .then(data => {
        response.render('index.ejs', {info: data})
    })
    .catch(error => console.error(error))
})

app.post("/addAvatar", (request, response) => {
    if(request.body.avatarName === ''){
        response.redirect('/')
        
    }else{
        db.collection('avatars').insertOne({avatarName: request.body.avatarName, likes: 0})
        .then(result => {
            console.log('Avatar Added')
            response.redirect('/')
        })
        .catch(error => console.error(error))
    }
})

app.put('/addOneLike', (request, response) => {
    db.collection('avatars').updateOne({avatarName: request.body.avatarNameS, likes: request.body.likesS},{
        $set: {
            likes:request.body.likesS + 1
        }
    },{
        sort: {_id: -1},
        upsert: false
    })
    .then(result => {
        console.log('Added One Like')
        response.json('Like Added')
    })
    .catch(error => console.error(error))

})

app.delete('/deleteAvatar', (request, response) => {
    db.collection('avatars').deleteOne({avatarName: request.body.avatarNameS})
    .then(result => {
        console.log('Avatar Deleted')
        response.json('Avatar Deleted')
    })
    .catch(error => console.error(error))
})


app.listen(process.env.PORT || PORT, ()=>{
    console.log(`The server is running on ${PORT}!`)
})
    })
    .catch(error => console.error(error))