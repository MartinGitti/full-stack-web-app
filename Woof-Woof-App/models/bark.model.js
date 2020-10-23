const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Bark Schema:
const barkSchema = new Schema({
    bark: {
        type: String,
        min: 3
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
}, { timestamps: true })

// Auto Populate Users:
const autoPopulateUser = function (next) {
    this.populate('User', '_id name email user');
    next()
}

barkSchema.pre('findOne', autoPopulateUser);
barkSchema.pre('findById', autoPopulateUser);
barkSchema.pre('find', autoPopulateUser);

module.exports = mongoose.model('Bark', barkSchema);