const Movie = require('../Models/movieModel');
const ApiFeatures=require('./../Utils/ApiFeatures');


//a mallware we define prefilling the query strings with value in request object without specifing query string in url
exports.getHighestRated=(req,res,next)=>{
    req.query.limit='5';
    req.query.sort='-ratings';
    next();


}

exports.getAllMovies = async (req, res) => {
    
        try {
            const features=new ApiFeatures(Movie.find(),req.query).filter().sort().limitFields().paginate();
            let movies=await features.query;// wait for query of class
            // let queryStr = JSON.stringify({ ...req.query });
            // queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);
            // const queryObj = JSON.parse(queryStr);
    
            // let query = Movie.find(queryObj);
    
            // if (req.query.sort) {
            //     const sortBy = req.query.sort.split(',').join(' ');
            //     query = query.sort(sortBy);
            // } else {
            //     query = query.sort('-createdAt');
            // }
    
            // if (req.query.fields) {
            //     const fields = req.query.fields.split(',').join(' ');
            //     query = query.select(fields);
            // } else {
            //     query = query.select('-__v');
            // }
    
            // // Pagination
            // const page = req.query.page * 1 || 1;
            // const limit = req.query.limit * 1 || 10;
            // const skip = (page - 1) * limit;
    
            // query = query.skip(skip).limit(limit);
            // if(req.query.page){
            //     const moviesCount=await Movie.countDocuments();
            //     if(skip>=moviesCount){
            //         throw new Error("TRhis page is not defined");
            //     }

            // }
    
            // const movies = await query;
    
            res.status(200).json({
                status: 'success',
                length: movies.length,
                data: {
                    movies
                }
            });
        } catch (err) {
            res.status(404).json({
                status: 'fail',
                message: err.message,
            });
        }
    
    
};

exports.createMovie = async (req, res) => {
    try {
        const movie = await Movie.create(req.body);
        res.status(201).json({
            status: 'success',
            data: {
                movie,
            },
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err.message,
        });
    }
};

exports.getMovie = async (req, res) => {
    try {
        const movie = await Movie.findById(req.params.id);

        if (!movie) {
            return res.status(404).json({
                status: 'fail',
                message: 'Movie not found',
            });
        }
        res.status(200).json({
            status: 'success',
            data: {
                movie,
            },
        });
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err.message,
        });
    }
};

exports.updateMovie = async (req, res) => {
    try {
        const updateMovie = await Movie.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });

        if (!updateMovie) {
            return res.status(404).json({
                status: 'fail',
                message: 'Movie not found',
            });
        }

        res.status(200).json({
            status: 'success',
            data: {
                movie: updateMovie
            },
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err.message,
        });
    }
};

exports.deleteMovie = async (req, res) => {
    try {
        const movie = await Movie.findByIdAndDelete(req.params.id);

        if (!movie) {
            return res.status(404).json({
                status: 'fail',
                message: 'Movie not found',
            });
        }

        res.status(204).json({
            status: 'success',
            data: null,
        });
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err.message,
        });
    }
};

exports.getMovieStats=async(req,res)=>{
    try{
        //we need to wait for query to get result
        const stats=await Movie.aggregate([// perform maths functions
            {$match:{ratings:{$gte:4.5}}},
            {$group:{
                _id:'$releaseYear',
                avgRating:{$avg:'$ratings'},
                avgPrice:{$avg:'$price'},
                minPrice:{$min:'$price'},
                maxPrice:{$max:'$price'},
                priceTotal:{$sum:'$price'},
                movieCount:{$sum:1}//every document increase plus 1
            }},//these stats there in results
            {$sort:{minPrice:1}},// apply this stats based on results of before stage 1 indicates ascending order so we get group data in results
            {$match:{maxPrice:{$gte:60}}}
        ]);// is mongodb feature used to aggregate data,in array we mention stages,match to filter,group to group documents stage

        res.status(200).json({
            status: 'success',
            length:stats.length,
            data:{
                stats
            }
        });
    }
    catch(err){
        res.status(404).json({
            status: 'fail',
            message: err.message,
        });
    }
}

exports.getMovieByGenre=async(req,res)=>{
    try{
        const genre=req.params.genre;
        const movies=await Movie.aggregate([
            {$unwind:'$genres'},//it destructure the document with array field into multiple single documents with each genre
            {$group:{
                _id:'$genres',
                movieCount:{$sum:1},
                movies:{$push:'$name'}
               
            }},
            {$addFields:{genre:"$_id"}},//to add fileds in result
            {$project:{_id:0}},//fields that want are 1 not want are 0
            {$sort:{movieCount:1}},
            //{$limit:6},//no of documents in result
            {$match:{genre:genre}}// to get only that genre
        ]);
        res.status(200).json({
            status: 'success',
            length:movies.length,
            data:{
                movies
            }
        });
    }
    catch(err){
        res.status(404).json({
            status: 'fail',
            message: err.message,
        });
    }
}

