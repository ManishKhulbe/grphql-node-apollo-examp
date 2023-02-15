const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const typeDefs = require('./typeDefs')
const resolvers = require('./resolvers')
const mongoose = require('mongoose')


async function startServer(){

    const app = express()
    const apolloServer = new ApolloServer({
        typeDefs : typeDefs,
        resolvers :resolvers
    }) 

    await apolloServer.start()

    apolloServer.applyMiddleware({app : app});

    app.use('/',(req,res)=>{
        res.send("hello from apollo server express node application ")
    })

     mongoose.connect('mongodb://localhost:27017/post_db',{
        useUnifiedTopology : true,
        useNewUrlParser : true
    })

    mongoose.connection.on('connected', function () {
       console.log("mongodb connected successfully");
    });



    app.listen(4000 , ()=>{
        console.log("server is running on port 4000")
    })
}

startServer()