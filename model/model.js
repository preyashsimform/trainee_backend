var mongoose=require('mongoose');
 
var StudentSchema = new mongoose.Schema({
    Name:String,
    Email:String,
    Roll:Number
});
 
module.exports = mongoose.model('student', StudentSchema, 'Students');