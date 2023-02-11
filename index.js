const express = require('express');
const app = express();
const dotenv = require('dotenv')
const mongoose =require('mongoose')
const userRoute =require('./routes/user')
const authRoute =require('./routes/auth')
const productsRoute =require('./routes/product')
const cartRoute =require('./routes/Cart')
const orderRoute =require('./routes/Order')
const cors = require("cors");

dotenv.config();


mongoose.set("strictQuery", false);
mongoose.connect( process.env.Mongo_URL)
.then(()=>console.log('db connection suceesfull'))
.catch((err)=>{
    console.log(err)
})

app.use(cors());
app.use(express.json())

app.use('/api/users',userRoute)

app.use('/api/auth',authRoute)

app.use('/api/products',productsRoute)

app.use('/api/orders',orderRoute)

app.use('/api/carts',cartRoute)

const port =process.env.PORT || 5000
app.listen(port,()=>{
    console.log(`backend server is running ${port}`)
})