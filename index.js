// express 
const express = require('express');
const app = express();
// cors must insatll 
const cors = require('cors')
app.use(cors());
// post body parser
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))

// mongodb
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://smartvalley:a09ARiAD6INfIWeP@cluster0.zi9ao.mongodb.net/Smart-valley?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
// ewpY7fCU3RFLg77j
//SifatRiders
//===================================mongo db

client.connect(err => {
    const products = client.db("Smart-valley").collection("product");
    // perform actions on the collection object
    app.post('/addProduct',(req,res) =>{
        const user= req.body;
        products.insertOne(user)
        .then(result =>{
          console.log(user);  
          res.send(result);
        })
        console.log(user);   
  });
 
  app.get('/allProduct',(req,res) =>{
   // console.log(req.query.email)
   products.find({})
    .toArray((error,documents) =>{
      res.send(documents);
    })


  })
  const orders = client.db("Smart-valley").collection("orders");
  app.post('/shopProduct',(req,res) =>{
    const newFilterProduct= req.body;
    console.log(newFilterProduct);
    orders.insertOne(newFilterProduct)
    .then(result =>{
      console.log(newFilterProduct);  
      res.send(result);
    })
  

    
});
app.get('/allCartProduct',(req,res) =>{
  console.log(req.query.email)
  orders.find({email:req.query.email})
   .toArray((error,documents) =>{
     res.send(documents);
   })
 })
 const placeOrder = client.db("Smart-valley").collection("PlaceOrder");
 app.post('/addPlaceOrder',(req,res) =>{
  const newPlaceOrderInfo= req.body;
  console.log(newPlaceOrderInfo);
  placeOrder.insertOne(newPlaceOrderInfo)
  .then(result =>{
    console.log(newPlaceOrderInfo);  
    res.send(result);
  })
});
app.get('/placeOrderCartInfo',(req,res) =>{
  console.log(req.query.email)
  placeOrder.find({email:req.query.email})
   .toArray((error,documents) =>{
     res.send(documents);
   })
 })

})

app.listen(4000, ()=> console.log('listening to port 4000'));