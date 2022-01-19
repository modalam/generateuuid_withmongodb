const express = require('express')
const bodyParser = require('body-parser')
var {v4 : uuidv4} = require('uuid')
var mongoose = require("mongoose")
const req = require('express/lib/request')

const app = express()

// The body-parser middleware to parse form data
app.use(bodyParser.json())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended : true}))

mongoose.connect('mongodb://localhost:27017/mydb',{
	useNewUrlParser:true,
	useUnifiedTopology:true
});

var db = mongoose.connection;

db.on('error',()=>console.log("Error in connection to Database"));
db.once('open',()=>console.log("Connected to Database"));

app.post("/sign_up",(req,res)=>{
	var {name, email} = req.body
	var v4 = uuidv4()

	var data = {
		"name" : name,
		"email": email,
		"userID": uuidv4(),
	}

	db.collection('users').insertOne(data,(err,collection)=>{
		if(err){
			throw err;
		}
		console.log("Record Inserted Sucessfully");
	});
	return res.redirect('index.html');
})

app.get("/",(req,res)=>{
	res.set({
		"Allow-across-Allow-Origin": '*'
	})
}).listen(8000);
console.log("Listening on port 8000");

