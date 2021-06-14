const mongoose = require('mongoose');

const taskSchema = mongoose.Schema({
    name: {type: String, title: 'Name', required: true},
    creator: {type: String, title: 'Creator', required: true},
    completed:{type: Boolean, title: 'Completed', required: true},
    dateDue: {type: String, title: 'Date Due', required: true},
    description: {type: String, title: 'Description', required: true}, subTask: [{
        description: {type: String, title: 'Description', required: true},
        completed:{type: Boolean, title: 'Completed', required: true}
    }]
    

})


module.exports = mongoose.model('Task', taskSchema);
