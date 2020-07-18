const express = require('express');
const path = require('path');
const hbs = require('hbs')
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();

const port = process.env.PORT || 3001;

// Define path for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location.
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve.
app.use(express.static(publicDirectoryPath));

app.get('/', (req, res) => {
  res.render('index', {
    title: 'Weather',
    name: 'Mike Rayner'
  })
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About Me',
    name: 'Mike Rayner'
  })
})

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help',
    helpText: 'This is some helpful text.',
    name: 'Mike Rayner'
  })
})

app.get('/weather', (req, res) => {
  if(!req.query.address){
    return res.send({
      error:'You must supply an address'
    });
  }
  geocode(req.query.address, (error, {longitude, latitude, location} = {}) => {
    if(error){
      return res.send({error});
    }
    forecast(latitude, longitude, (error, forecastData) => {
      if(error){
        return res.send({error})
      }
      res.send({
        forecast: forecastData,
        location,
        address: req.query.address
      })
    })
  })
});

app.get('/products', (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: 'You must provide a search term'
    })
  }
  console.log(req.query.search)
  res.send({
    products: []
  })

});

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: '404',
    errorMessage: 'Help article not found',
    name: 'Mike Rayner'
  })
})

app.get('*', (req, res) => {
  res.render('404', {
    title: '404',
    errorMessage: 'Page Not Found',
    name: 'Mike Rayner'
  })
});


app.listen(port, () => {
  console.log('Server is up on on port ' + port)
})
