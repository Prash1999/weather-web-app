const path = require("path")
const express =  require("express")
const hbs = require("hbs")
const geocode = require("./utils/geocode.js")
const forecast = require("./utils/forecast.js")

const app = express()
const port = process.env.PORT || 3000
// Define paths for express config
const viewsPath = path.join(__dirname,"../templates/views")
const partialPath = path.join(__dirname, "../templates/partials")

//Setup handlebars engine and views location
app.set("view engine", "hbs" )
app.set("views", viewsPath)
hbs.registerPartials(partialPath)

//if not understood visit expressjs.com documentation
// Setup static directory to serve
app.use(express.static(path.join(__dirname, "../public")))

app.get("", (req,res) =>{
    res.render("index", {
        title: "Weather",
        name: "Prashant Gosavi"
    })
})

// app.get("", (req, res) =>{
//     res.send("Hello express!")
// })

app.get("/help", (req, res) => {
    res.render("help",{
        title : "Help",
        name : "Prashant Gosavi",
        helpText: "This is some helpful text"
    })
})

app.get("/about", (req, res) => {
    res.render("about", {
        title: "About me",
        name: "Prashant Gosavi"
    })
})



app.get("/weather", (req, res) => {
    if(!req.query.address){
        return res.send({
            error: "You must provide address term"
        })
    }
    // res.send({
    //     forecast: "It is hot outside",
    //     location: req.query.address,
    //     address: req.query.address
    // })
    const location = req.query.address
    geocode(location,(error, {latitude,longitude,location} = {}) => {   // instead of data {latitude,longitude,location} see 5-es6-object.js
                if(error){
                        return res.send({error})
                }
                forecast(latitude,longitude,(error,forecastData) => {
                       if(error){
                       return res.send({error})
                       }
                       res.send({
                        forecast: forecastData,
                        location: location,
                        address: req.query.address
                    })
                })
        })
})

// app.get("/products", (req, res) =>{
//     if (!req.query.search){
//         return res.send({
//             error: "You must provide search term"
//         })
//     }
//     console.log(req.query.search)
//     res.send({
//         products: []
//     })
// })

app.get("/help/*", (req,res) =>{
    res.render("error", {
        title: "404",
        name: "Prashant Gosavi",
        errorMessage: "Help article not found"
    })
})

app.get("*",(req,res) => {
    res.render("error", {
        title: "404",
        name: "Prashant Gosavi",
        errorMessage: "Page not found"
   })
})



//app.com
//app.com/help

app.listen(port, () => {
    console.log("server is up on port " + port)
}) //starts server