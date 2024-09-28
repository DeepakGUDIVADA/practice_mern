const mongoose=require('mongoose');
const fs=require('fs');

// virtual properties are fields defined in schema that are derived from other fields
const movieSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Name is required:"],
        unique:true,
        trim:true//remove whitepaces before and after of value
    },
    description:{
        type:String,
        required:[true,"Description is required:"],
        unique:true,
        trim:true//remove whitepaces before and after of value
    },
    duration:{
        type:Number,
        default:1.0
    },
    ratings:Number,
    totalRatings:{
        type:Number
    },
    releaseYear:{
        type:Number,
        required:[true,"Release year is required field"]

    },
    releaseDate:{
        type:Date
    },
    createdAt:{
        type:Date,
        default:Date.now(),
        select:false
    },
    genres:{
        type:[String],
        required:[true,"genres is required field"]
    },
    directors:{
        type:[String],
        required:[true,"directors is required field"]
    },
    coverImage:{
        type:String,
        required:[true,"coverImage is required field"]
    },
    actors:{
        type:[String],
        required:[true,"actors is required field"]
    },
    price:{
        type:Number,
        required:[true,"price is required field"]
    },// object schmea of model
    createdBy:string
},
    
{//object for option
    // when output data in json we need to include virtual properties
    toJSON:{virtuals:true},
    toObject:{virtuals:true}// to have virtual field inside object
     // we can tuse this properties in find method as filter in  mongoose
});//we create a schema and its properties

movieSchema.virtual('durationInHours').get(function(){
    return this.duration/60;
})// arrow function not has its own this keyword

//mongoose middle wares are pre and post hooks
//middleware run before and after a certain event
// this middleware execute before document is save called when .save() or .create() methods is caled
movieSchema.pre('save',function(next){
   console.log(this);//document which is getting saved
   this.createdBy='Deepak';
   next();
})
movieSchema.post('post',function(doc,next){
    const content=`A new movie document with name ${doc.name} has been inserted at created ${doc.createdBy}`;
    fs.writeFileSync('./../Log.log.txt',content,{flag:'a'},(err)=>{
        console.log(err.message);
    });
})

//creating of model based on which schema
const Movie=mongoose.model('Movie',movieSchema);
//using this we can create,query,delete,query documents
//model name shouls start with capital

module.exports=Movie;