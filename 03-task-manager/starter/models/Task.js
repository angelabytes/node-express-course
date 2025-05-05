const { Schema, mongoose } = require('mongoose');


const TaskSchema = new Schema({
    name: String, 
    completed: Boolean,
});

module.exports = mongoose.model('Task', TaskSchema);