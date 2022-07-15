const express = require('express');
const path = require('path')
const hbs = require('hbs')
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();

//set up directory
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../template/views')
const partialsPath = path.join(__dirname, '../template/partials')

//set up templating engine
//the default directory name for hbs to recognize is views
app.set('view engine', 'hbs')
app.set('views', viewsPath);
hbs.registerPartials(partialsPath)

//set up static path
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Raphael Donanu'
    })
});

app.get('/about', (req, res) => {
    if(req.headers["accept"] == "application/json") {
        res.send({
            name: 'Raphael Donanu'
        })
        return;
    }
    res.render('about', {
        title: 'About me',
        name: 'Raphael Donanu'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'help',
        message: 'Follow thin link for more details',
        name: 'Raphael Donanu'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({error: 'You must provide the address term'})
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            return res.send({error})
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send( {error})
            }
            res.send({
                forcast: forecastData,
                location: location, 
                address: req.query.address
            })
        })
    })


})

// app.get('/products', (req, res) => { 
//     if (!req.query.search) {
//         return res.send({error: 'You must provide a search term'})
//     }
//     console.log(req.query) 
//     res.send([])
// })

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Raphael Donanu',
        message: 'The page article you are looking for does not exist'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Raphael Donanu',
        message: 'The page not found'
    })
})

app.listen(4000, () => {
    console.log('Server is running')
});

