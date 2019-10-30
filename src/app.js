const path = require('path')
const express = require('express')
const hbs=require('hbs')
const darksky= require('../src/utils/darksky')
const geocode = require('../src/utils/geocode')
const app= express()
const port = process.env.PORT || 3000
// define paths for express config
const publicDirectoryFile =path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialPath = path.join(__dirname,'../templates/partials')
// Setup handlebar engine and views location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialPath)
// setup static directory to serve
app.use(express.static(publicDirectoryFile))
app.get('',(req,res)=>{
    res.render('index',{
        title: 'Weather App',
        name: 'saurabh kanswal'
    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
       return res.send({
            error:'please provide location'
        })
    }
    geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
        if(error){
        return res.send({error})
        }
        darksky(latitude,longitude,(error,forecastData)=>{
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
})


app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About saurabh kanswal',
        name:'saurabh kanswal',
        companyName: 'programmingrofl'
    })
})
app.get('/help',(req,res)=>{
    res.render('help',{
        message: 'this is help message S.O.S',
        title: 'help title',
        name: 'saurabhkanswal'
    })
})
app.get('/help/*',(req,res)=>{
    res.render('404',{
        errorMessage:'help articles not found',
        name:'saurabh kanswal'
    })
})
app.get('*',(req,res)=>{
    res.render('404',{
        errorMessage:'page NOT found',
        name:'saurabh'
    })
})
app.listen(port,()=>{
    console.log('server is running on port '+port)
    
})