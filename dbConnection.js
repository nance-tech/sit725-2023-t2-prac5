const {
    MongoClient,
    ServerApiVersion,
    Collection
} = require("mongodb");

const uri = "mongodb+srv://nycmbugua:kW2zMwteU9cpkmRK@cluster0.qaddve5.mongodb.net/?retryWrites=true&w=majority"

const client=new MongoClient(uri,{
    serverApi:{
        version:ServerApiVersion.v1,
        strict:true,
        deprecationErrors:true
    }
});
client.connect();
module.exports(client)