const path = require('path')
const express = require('express')
const hbs = require('hbs')

const forecast = require('./utils/forecast')

const app = express()

// Paths for Express Config
const pubDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static dir location
app.use(express.static(pubDirPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Akash Kamble'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Akash Kamble'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Akash Kamble',
        message: 'Help msg'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address.'
        })
    }

    forecast(req.query.address, (error, {location, weather, temp, feelslike, icon} = {}) => {
        if (error) {
            return res.send({ error })
        }

        res.send({
            location, 
            weather,
            temp,
            feelslike,
            icon
        })
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Akash Kamble',
        errMsg: 'Help article not found'
    })
})

app.get('/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Akash Kamble',
        errMsg: 'Page not found'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})