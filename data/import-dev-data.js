// const mongoose=require('mongoose');
// const dotenv=require('dotenv');
// const fs=require('fs');
// const Movie=require('./../Models/movieModel');
// dotenv.config({path:'./config.env'});


// mongoose.connect(process.env.CONN_STR,{
//     useNewUrlParser:true
// })
// .then((conn)=>{
//      console.log("DB connectio successful");
// })
// .catch(()=>{
//     console.log("some error is occured");
// })

// const movies=JSON.parse(fs.readFileSync('./data/movies.json','utf-8'));

// // delete existing movie documents from collection
// const deleteMovies=async()=>{
//     try{
//         Movie.deleteMany()//not give any paranthesis so delete all documents from it
//         console.log("Movies successfully deleted");
//     }
//     catch(err){
//       console.log(err.message);
//     }
// }

// // import existing movie datat from documents to mongodb collection
// const importMovies=async()=>{
//     try{
//         Movie.create(movies);//for single document use {} for multiple documents use array
//         console.log("Data successfully imported");
//     }
//     catch(err){
//       console.log(err.message);
//     }
// }

// // deleteMovies();
// // importMovies();
// console.log(process.argv);

const mongoose = require('mongoose');
const dotenv = require('dotenv');
const fs = require('fs');
const Movie = require('./../Models/movieModel');
dotenv.config({ path: './config.env' });

mongoose.connect(process.env.CONN_STR, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then((conn) => {
    console.log("DB connection successful");
})
.catch((err) => {
    console.log("Error occurred:", err.message);
});

const movies = JSON.parse(fs.readFileSync('./data/movies.json', 'utf-8'));

// Delete existing movie documents from collection
const deleteMovies = async () => {
    try {
        await Movie.deleteMany(); // Await the deleteMany() method
        console.log("Movies successfully deleted");
    } catch (err) {
        console.log(err.message);
    }
    process.exit();
}

// Import existing movie data from JSON file to MongoDB collection
const importMovies = async () => {
    try {
        await Movie.create(movies); // Await the create() method
        console.log("Data successfully imported");
    } catch (err) {
        console.log(err.message);
    }
    process.exit();
}

// Check command line arguments and run appropriate function
if (process.argv[2] === '--import') {
    importMovies();
} else if (process.argv[2] === '--delete') {
    deleteMovies();
}
// console.log(process.argv);
//node.exe
//data/impoty     2 execute so our function is third based on it we call

// node data/import-dev-data.js --delete
