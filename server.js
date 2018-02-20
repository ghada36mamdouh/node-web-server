// visit http://expressjs.com
// for template lang: http://handlebarsjs.com/ === https://www.npmjs.com/package/hbs

// for git decumenttion: https://git-scm.com/

const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

// app.set('view engine', 'hbs');

// ------------for different ext.------------ 
// app.set('view engine', 'html');
// app.engine('html', hbs.__express);
// ------------------------------------------


app.use((req,res,next) => {
	var now = new Date().toString();
	var log = `${now} : ${req.method} ${req.url}` ;
	console.log(log);
	fs.appendFile('server.log', log + '\n');
	next();
});

app.use((req,res,next)=>{
	res.render('maintenance.hbs');
});

app.use(express.static(__dirname + '/public'));

// ------------------------------------------
hbs.registerHelper('getYear', () => {
	return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
	return text.toUpperCase();
});

hbs.registerPartials(__dirname + '/views/partials');
// --------------------------------------------------------

app.get('/', (req,res) => {
	res.render('home.hbs', {
		title: 'Home',
		// year: new Date().getFullYear(),
		text: 'welcome',
	});
});

// app.get('/', (req,res) => {
// 	// res.send('<h3>Hello!</h3>');
// 	res.send({
// 		name: 'goo',
// 		likes: [
// 			'amke',
// 			'bike',
// 		]
// 	});
// });

// app.get('/about', (req,res) => {
// 	res.send('<h3>About!</h3>');
// });

app.get('/about', (req,res) => {
	// res.render('about.hbs');
	res.render('about.hbs', {
		title: 'About',
		// year: new Date().getFullYear()
	});
});

app.get('/bad', (req,res)=>{
	res.send({
		errMessage: 'unable to connect.',
	});
});


// app.listen(3000);
app.listen(3000 , ()=>{
	console.log('the server work on port 3000');
});