const express = require('express'),
	app = express(),
	bodyparser = require('body-parser'),
	joi = require('@hapi/joi'),
	cors = require('cors'),
	multer = require('multer'),
	port = process.env.PORT || 3001,
	mysql = require('mysql'),
	bcrypt = require('bcrypt');

//mysql connection setup
var connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '',
	database: 'nodejs_api'
});

//mysql connection check
connection.connect((err)=>{
	if(err) console.log('error connecting');
	else console.log('connected');
});

//middlewares
app.use(bodyparser.urlencoded({extended:false}));
//app.use(express.json());
app.use(bodyparser.json({limit: '50mb'}));
//enabling cors
app.use(cors());

// declaring image destination and path
var storage = multer.diskStorage({
	destination: './public/images/',
	filename: function(req, file, cb){
		cb(null, file.fieldname+ Date.now()+path.extname(file.originalname))
	}
});
//ends 

// checking type of an image and its size
const upload = multer({
	storage: storage,
	limits: {fileSize: 10000000},
	fileFilter: function(req, file, cb){
		checkFileType(file, cb);
	}
}).single('image');
//ends

function checkFileType(file, cb){
	const filetypes = /jpeg|jpg|png|/;
	const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
	const mimetype =filetypes.test(file.mimetype);

	if(mimetype && extname){
		return cb(null, true);
	}else{
		cb('Error: Images');
	}
}

app.get('/',(req, res)=>{
	res.send('nodejs api');
});

//geting all users
app.get('/api/users',(req,res)=>{
	connection.query('SELECT id, name, email FROM users ORDER BY id', (err, rows, fields)=>{
		if(err) console.log('error querying data');
		else{
			res.send(rows);
		}
	});
});

//getting users by id
app.get('/api/users/:id', (req,res)=>{
	const id = req.params.id;
	connection.query('SELECT id, name, email FROM users ORDER BY id', (err, rows, fields)=>{
		if(err) console.log('error querying data');
		else{
			const response = rows.find(row => row.id === parseInt(id));
			if(response) res.send(response);
			else res.status(401).send(`No user with the id of ${id}`);
		}
	});
});

//user registration
app.post('/api/users',(req,res)=>{
	const name = req.body.name,
	email = req.body.email,
	password = req.body.password,
	regName = /^[a-zA-Z]+ [a-zA-Z]+$/;

	const schema = joi.object().keys({
		name: joi.string().min(4).trim().required(),
		email: joi.string().trim().email().required(),
		password: joi.string().min(5).required(),
	});

	if(!regName.test(name)){
		res.send('enter full name');
		return;
	}
	
	const {error} = schema.validate(req.body);
	
	if(error) res.send(error.details[0].message);
	else{
		var post = {
			name: name,
			email: email,
			password: bcrypt.hashSync(password,10)
		}
		connection.query('INSERT INTO users SET ?',post,(err, rows, fields)=>{
			if(err) console.log(err);
			else res.send("successfully registered");
	    });
	}
});

//update user password
app.put('/api/user/update', (req, res)=>{
	const password = req.body.password,
	      confirmpassword = req.body.confirmpassword,
	      email = req.body.email;

	const schema = joi.object().keys({
		password: joi.string().min(5).required(),
		email: joi.string().trim().email().required(),
		confirmpassword: joi.string().min(5).required()
	});

	if(password !== confirmpassword) res.send('passwords does not match');

	connection.query('SELECT email FROM users ORDER BY id', (err, rows, fields)=>{
		if(err) console.log('error selecting data');
		else{
			const response = rows.find(row => row.email === email);
			if(response){
				const {error} = schema.validate(req.body);
	            if(error) res.send(error.details[0].message);
	            else{
	            	var data = [bcrypt.hashSync(password,10), email];
	            	connection.query('UPDATE users SET password = ? WHERE email = ?', data,
	            	(err, rows, fields)=>{
	            		if(err) console.log(err);
	            		else res.send('password successfully updated');
	            	});
	            }
			} 
			else res.status(401).send('invalid email');
		}
	});
});

//users login
app.post('/api/user/login', (req, res)=>{
	const email = req.body.email,
	    password = req.body.password;

	if(email === "" || password === ""){
		res.send({status: 'input field(s) cannot be empty'});
		return;
	}

	var data = [email];
	connection.query('SELECT email,password,id FROM users WHERE email = ?',email, (err, rows, fields)=>{
		if(err) console.log('error logging you in, check back some minutes');
	    else{
	    	if(rows[0]){
			   if(bcrypt.compareSync(password,rows[0].password)){
				res.send({status:'successful', id: rows[0].id});
			   }else res.send({status:'invalid password'});
		    }else{
		    	res.send({status: 'invalid email address'});
		    }
		}
	});
});

app.delete('/api/user/delete/:id', (req, res)=>{
	const id = [req.params.id];
	connection.query('DELETE FROM users WHERE id = ?',id, (err, rows, fields)=>{
		if(err) console.log('error deleting data');
		else{
			if(rows.affectedRows > 0) res.send('successful deleted');
			else res.status(401).send(`No user with the id of ${id}`);
		}
	});
});

app.listen(port, (err, success)=>{
	if(err) console.log('error connection');
	else console.log(`subscriber connected to ${port}`);
});