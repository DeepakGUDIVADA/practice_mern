//creating server
const dotenv=require('dotenv');
dotenv.config({path:'./config.env'});
const app=require('./app.js');
const mongoose = require('mongoose');
console.log(process.env);

mongoose.connect(process.env.CONN_STR,{
    useNewUrlParser:true
})
.then((conn)=>{
     console.log("DB connectio successful");
})
.catch(()=>{
    console.log("some error is occured");
})


// const testMovie=new Movie({
//     name:"Dummy",
//     description:"this is created using vs code",
//     duration:180,
//     ratings:4
// });

//  testMovie.save()
//  .then(doc=>{
//     console.log(doc);
//  })
//  .catch((err)=>{
//   console.log("error occured"+err);
//  });// will save the docuument with these details in database
// // in Movie Collection. it will return a zip promise we can consume promise using then method 
// //callback function receive the document which we create


const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log("Server has started");
});


