const mongoose = require('mongoose');// Connect to database.
const Schema = mongoose.Schema;// Schema setup.
const crypto = require('crypto');// Secure credentials.

// User Schema
const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
    },
    hashed_password: {
        type: String,
        required: true
    },
    salt: String,
    role: {
        type: String,
        default: 'user'
    },
    barks: [{
        type: Schema.Types.ObjectId,
        ref: 'Bark'
    }]
}, { timestamps: true })


// Virtual Fill to Encrypt Password:
userSchema
    .virtual('password')
    .set(function (password) {
        this._password = password;
        this.salt = this.generateSalt();
        this.hashed_password = this.encryptPassword(password);
    })
    .get(function () {
        return this._password
    })

// Methods:
userSchema.methods = {
    authenticate: function (plainText) {
        return this.encryptPassword(plainText) === this.hashed_password; // true || false
    },

    encryptPassword: function (password) {
        if (!password) return ''
        try {
            return crypto
                .createHmac('sha1', this.salt)
                .update(password)
                .digest('hex');
        } catch (err) {
            return ''
        }
    },

    generateSalt: function () {
        return Math.round(new Date().valueOf() * Math.random() + '')
    }
}

// // Auto Populate Posts:
const autoPopulateBarks = function (next) {
    this.populate('barks', '_id bark user');
    next()
}

userSchema.pre('findById', autoPopulateBarks);
userSchema.pre('findOne', autoPopulateBarks);
userSchema.pre('find', autoPopulateBarks);

module.exports = mongoose.model('User', userSchema);