const express = require('express');
const hbs = require('hbs'); //handle bar
const fs = require('fs');

const port = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('veiw engine', 'hbs'); //first: key we want to set, second: the value we want to use

app.use((req,res,next) => {
    var now = new Date().toString();
    var log = `${now} ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        if(err) {
            console.log('Unable to append to server.log.');
        }
    }); 
    next();
});

// app.use((req, res, next) => {
//     res.render('maintains.hbs');
// });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

app.get('/', (req,res) => {
    res.render('home.hbs', {
        welcomeMessage: 'welcome to my site',
        pageTitle: 'Home Page',
    });
});

app.get('/about', (req,res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page',
    }); //help us render any of our templates we set up
});

app.get('/projects', (req,res) => {
    res.render('projects.hbs', {
        pageTitle: 'project page'
    });
});

app.get('/bad', (req,res) => {
    res.send({
        errorMassage: 'error handling request'});
});

app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});