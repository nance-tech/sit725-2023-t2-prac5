let express = require('express');

let app = express();
const {
    MongoClient,
    ServerApiVersion,
    Collection
} = require("mongodb");
const uri = "mongodb+srv://nycmbugua:kW2zMwteU9cpkmRK@cluster0.qaddve5.mongodb.net/?retryWrites=true&w=majority"

let port = process.env.port || 3000;
let collection;

app.use(express.static(__dirname + '/'));
app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));


//create a mongoClient 
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    },
});

async function runDBconnect() {
    try {
        //connects the client to the server
        await client.connect();
        collection = client.db().collection('Cat');
        console.log(collection);
    }
    catch (ex) {
        console.error(ex);
    }
};

const cardList=[
{
    title:"Kitten 1",
    image:"images/active.jpg",
    link:"ative image",
    description:"first image"
},
{
    title:"Kitten 2",
    image:"images/stressed.jpg",
    link:"This guy is stressed",
    description:"second image"
},
{
    title:"Kitten 3",
    image:"images/sleepy.jpg",
    link:"This one is sleepy",
    description:"second image"
}

]


app.get('/api/projects',function(req,res){
      res.json({statusCode: 200, data: cardList, message:"Success"})
});
app.get('/', function (req, res) {
    res.render('index.html');
});

app.get('/api/cats', (req, res) => {
    getAllCats((err, result) => {
        if (!err) {
            res.json({
                statuscode: 200,
                data: result,
                message: 'get all calls sucessful'
            });
        }
    });
});


app.post('/api/cat', (req, res) => {
    let cat = req.body;
    postCat(cat, (err, result) => {
        if (!err) {
            res.json({
                statuscode: 201,
                data: result,
                message: 'success'
            });
        }
    });
});

function postCat(cat, callback) {
    collection.insertOne(cat, callback);
}

function getAllCats(callback) {
    collection.find({}).toArray(callback);
}


app.listen(port, () => {
    console.log('server started');
    runDBconnect();
});