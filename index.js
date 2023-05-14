const express = require('express')
const mongoose = require('mongoose')
var hbs = require('hbs')
var cookieParser = require('cookie-parser')
var path = require('path')

var bodyParser = require('body-parser')

mongoose.connect("mongodb://127.0.0.1:27017/cinema",{
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const screen1Model = mongoose.model('screen1',{
    seatno: {type:Number},
    status: {type:String}
})
var screen1res
screen1Model.find()
.then(function (models) {
  screen1res = models
})
.catch(function (err) {
  console.log(err);
});


const data = [
    {
        user:"username1",
        content :"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec quis lacus in magna tempor tincidunt. Nam eget nunc nisl. Nulla a eros non lectus consequat rutrum vel non felis. Phasellus imperdiet ipsum ac felis dignissim, a iaculis turpis dapibus. Nullam diam augue, posuere in laoreet vitae,",
        likes:"2",
        shares:"3"
    },
    {
        user:"username2",
        content :"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec quis lacus in magna tempor tincidunt. Nam eget nunc nisl. Nulla a eros non lectus consequat rutrum vel non felis. Phasellus imperdiet ipsum ac felis dignissim, a iaculis turpis dapibus. Nullam diam augue, posuere in laoreet vitae,",
        likes:"4",
        shares:"5"
    },
    {
        user:"username3",
        content :"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec quis lacus in magna tempor tincidunt. Nam eget nunc nisl. Nulla a eros non lectus consequat rutrum vel non felis. Phasellus imperdiet ipsum ac felis dignissim, a iaculis turpis dapibus. Nullam diam augue, posuere in laoreet vitae,",
        likes:"5",
        shares:"1"
    }
]

const movies = [
    {
        name: "Baahubali",
        rate: 80,
        screenNo:1
    },
    {
        name: "RRR",
        rate: 150,
        screenNo:2
    },
    {
        name: "Awe",
        rate: 70,
        screenNo:3
    }
    
]

const screen1 = [
    {
        seatno: 1,
        status: "occupied"
    },
    {
        seatno: 2,
        status: ""
    },
    {
        seatno: 3,
        status: ""
    },
    {
        seatno: 4,
        status: "occupied"
    },
    {
        seatno: 5,
        status: ""
    },
    {
        seatno: 6,
        status: "occupied"
    },
    {
        seatno: 7,
        status: "occupied"
    },
    {
        seatno: 8,
        status: ""
    },
    {
        seatno: 9,
        status: "occupied"
    },
    {
        seatno: 10,
        status: "occupied"
    },
    {
        seatno: 11,
        status: ""
    },
    {
        seatno: 12,
        status: "occupied"
    },
    {
        seatno: 13,
        status: "occupied"
    },
    {
        seatno: 14,
        status: "occupied"
    },
    {
        seatno: 15,
        status: ""
    },
    {
        seatno: 16,
        status: "occupied"
    }

]

const screen2 = [
    {
        seatno: 1,
        status: ""
    },
    {
        seatno: 2,
        status: "occupied"
    },
    {
        seatno: 3,
        status: ""
    },
    {
        seatno: 4,
        status: "occupied"
    },
    {
        seatno: 5,
        status: ""
    },
    {
        seatno: 6,
        status: "occupied"
    },
    {
        seatno: 7,
        status: "occupied"
    },
    {
        seatno: 8,
        status: ""
    },
    {
        seatno: 9,
        status: "occupied"
    },
    {
        seatno: 10,
        status: "occupied"
    },
    {
        seatno: 11,
        status: ""
    },
    {
        seatno: 12,
        status: "occupied"
    },
    {
        seatno: 13,
        status: "occupied"
    },
    {
        seatno: 14,
        status: "occupied"
    },
    {
        seatno: 15,
        status: ""
    },
    {
        seatno: 16,
        status: "occupied"
    }

]

const screen3 = [
    {
        seatno: 1,
        status: ""
    },
    {
        seatno: 2,
        status: ""
    },
    {
        seatno: 3,
        status: "occupied"
    },
    {
        seatno: 4,
        status: "occupied"
    },
    {
        seatno: 5,
        status: ""
    },
    {
        seatno: 6,
        status: "occupied"
    },
    {
        seatno: 7,
        status: "occupied"
    },
    {
        seatno: 8,
        status: ""
    },
    {
        seatno: 9,
        status: "occupied"
    },
    {
        seatno: 10,
        status: "occupied"
    },
    {
        seatno: 11,
        status: ""
    },
    {
        seatno: 12,
        status: "occupied"
    },
    {
        seatno: 13,
        status: "occupied"
    },
    {
        seatno: 14,
        status: "occupied"
    },
    {
        seatno: 15,
        status: ""
    },
    {
        seatno: 16,
        status: "occupied"
    }

]

const app = express()
app.set('view engine', 'hbs');
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 
app.use(cookieParser())
app.use(express.static(path.join(__dirname, "public")));

app.get('/',(req,res)=>{
    res.render("login")
})

app.get('/register',(req,res)=>{
    res.render("register")
})

app.get('/cinema',(req,res)=>{
    res.render("cinema",{
        screen1: screen1res,
        screen2: screen2,
        screen3: screen3,
        movies: movies
    })
})

app.post('/login',(req,res)=>{
    console.log(req.body.email)
    console.log(req.body.pwd)
    res.cookie("test1","abcd1")
    res.send(req.body.email)
})

app.get('/posts',verifyLogin,(req,res)=>{
    
    res.render("posts",{
        data:data
    })
})

function verifyLogin(req,res,next) {
    //res.cookie("test","abcd")
    console.log(req.cookies.test1)
    next()
}

app.get('/addposts',(req,res)=>{
    req.url = '/posts'     
   return app.handle(req, res)
})


app.listen(3000,()=>{
    console.log("Listening...")
})