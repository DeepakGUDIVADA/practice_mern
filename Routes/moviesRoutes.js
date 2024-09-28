const express=require('express');
const moviesController=require('./../Controllers/moviesController');


const moviesRouter=express.Router();


// moviesRouter.param('id',moviesController.checkId)
// if query string got more requests do aliasing a route

moviesRouter.route('/highest-rated')
            .get(moviesController.getHighestRated,moviesController.getAllMovies)

moviesRouter.route('/movie-stats').get(moviesController.getMovieStats)


moviesRouter.route('/movie-by-genre/:genre').get(moviesController.getMovieByGenre)
moviesRouter.route('/')
           .get(moviesController.getAllMovies)
           .post(moviesController.createMovie)


moviesRouter.route('/:id')
            .get(moviesController.getMovie)
            .patch(moviesController.updateMovie)
            .delete(moviesController.deleteMovie)


module.exports=moviesRouter;