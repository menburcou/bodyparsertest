const express = require('express');
const bodyParser= require('body-parser')
const Sequelize = require("sequelize");
const app = express();
var firstName;
var lastName;
var length;
var nameslist = [];

app.use(bodyParser.urlencoded({extended:true}))

const sequelize = new Sequelize('','','',{
	dialect:'sqlite',

	storage: './test.sqlite3'
});

const User = sequelize.define('user', {
	firstName:{
		type: Sequelize.STRING,
	},
	lastName:{
		type: Sequelize.STRING,
	}
},
{
	freezeTableName:true,
});

sequelize.sync();

app.get('/', (req,res) => {
	res.sendfile('.'+'/app.html')
})

app.post('/name', (req,res)=>{
	lastName = req.body.lastName;
	firstName = req.body.firstName;
	User.sync().then(()=>{
		return User.create({
			firstName:firstName,
			lastName:lastName,
		});
	});
	res.redirect('/namelist');

	if(res){
		console.log("Communicated to the database.")
	}
})
app.get('/namelist',(req,res)=>{
	User.findAll({
		attributes:['firstName', 'lastName'],
	})
	.then((users)=>{
		nameslist ='';
		for(var i = 0; i<users.length; i++){
		length = users[i].firstName+ ' ' + users[i].lastName
		nameslist = nameslist + ' <br>' + length;
	}
	console.log(nameslist);
	res.send(nameslist);
		
	})
  })
  

app.listen(3000, function(){
	console.log('listening on 3000')
})

