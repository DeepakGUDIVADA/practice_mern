// Import packages
const express = require('express');

const morgan=require('morgan');
const moviesRouter=require('./Routes/moviesRoutes.js');



let app = express();


// Middleware to parse incoming request bodies
app.use(express.json());
app.use(morgan('dev'));// these return middleware function


const logger=function(req,res,next){
    console.log("Custom middleware");
    next();
}

app.use(express.static('./public'))//all static files in public are served
app.use(logger);// no paranthesis for custonm middleware it si middleware function





// // GET all movies
// app.get('/api/v1/movies', (req, res) => {
//     res.status(200).json({
//         status: "success",
//         count: movies.length,
//         data: {
//             movies: movies
//         }
//     });
// });

// // GET a movie by ID
// app.get('/api/v1/movies/:id', (req, res) => {
//     console.log(req.params);
//     const id = req.params.id * 1; // Convert id to number
//     let movie = movies.find(el => el.id === id);
    
//     if (!movie) {
//         return res.status(404).json({
//             status: "fail",
//             message: "Movie with ID " + id + " is not found to get"
//         });
//     }
    
//     res.status(200).json({
//         status: "success",
//         data: {
//             movie: movie
//         }
//     });
// });

// // POST a new movie
// app.post('/api/v1/movies', (req, res) => {
//     // Generate new ID
//     const newId = movies[movies.length - 1].id + 1;
//     // Assign the new ID to the new movie object
//     const newMovie = Object.assign({ id: newId }, req.body);
    
//     // Add the new movie to the movies array
//     movies.push(newMovie);
    
//     // Write the updated movies array to the file
//     fs.writeFile('./data/movies.json', JSON.stringify(movies), (err) => {
//         res.status(201).json({
//             status: "success",
//             data: {
//                 movie: newMovie
//             }
//         });
//     });
// });

// //updating the movie based on id and write on file and give response of new data
// app.patch('/api/v1/movies/:id',(req,res)=>{
//     const id=req.params.id*1;
//     let movieToUpdate=movies.find(el => el.id===id);

//     if (!movieToUpdate) {
//         return res.status(404).json({
//             status: "fail",
//             message: "Movie with ID " + id + " is not found to patch"
//         });
//     }



//     let index=movies.indexOf(movieToUpdate);

//     const updateMovieObject=Object.assign(movieToUpdate,req.body);
//     movies[index]=updateMovieObject;

//     fs.writeFile('./data/movies.json',JSON.stringify(movies),(err)=>{
//         res.status(200).json({
//             status:"success",
//             data:{
//                 movie:updateMovieObject
//             }
//         })
//     })


// })

// // Deleting the movie
// app.delete('/api/v1/movies/:id',(req,res)=>{
//     const id=req.params.id*1;
//     const movieToDelete=movies.find(el=>el.id===id);

//     if (!movieToDelete) {
//         return res.status(404).json({
//             status: "fail",
//             message: "Movie with ID " + id + " is not found to delete"
//         });
//     }

//     const index=movies.indexOf(movieToDelete);


//     movies.splice(index,1);
//     fs.writeFile('./data/movies.json',JSON.stringify(movies),(err)=>{
//         res.status(204).json({
//             status:"success",
//             data:{
//                 movie:null
//             }
//         })
//     })

// })


app.use('/api/v1/movies',moviesRouter);

// Start the server

module.exports=app;
