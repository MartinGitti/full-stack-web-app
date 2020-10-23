// Import Models:
const Bark = require('../models/bark.model');
const User = require('../models/user.model');

/*
View all Barks>
Barks of logged in user will be displayed.
*/
const viewBarks = (req, res) => {
    const loggedInUser = req.user._id;

    User.findById(loggedInUser).exec((err, user) => {
        if (err) {
            return res.status(400).json({
                error: 'Failed to fetch & display barks!'
            })
        }

        return res.json({
            barks: user.barks
        })
    })
}

// Create a new bark:
const createBark = (req, res) => {
    const user = req.user._id;
    const bark = new Bark({ user, bark: req.body.bark });

    // Save new bark to database.
    bark.save();

    // Find the logged in user and the bark:  
    User.findById(user).exec((err, data) => {
        if (err) {
            return res.status(400).json({
                error: 'Failed to send new bark!'
            })
        }

        // Data represents a User object
        data.barks.push(bark);
        // Save the updated user with the new bark.
        data.save();

        return res.status(200).json({
            message: 'Bark sent!',
            data
        })
    })
}

// Update bark by id:
const updateBark = (req, res) => {
    const { _id } = req.params;

    const updatedBark = req.body.bark;

    Bark.findByIdAndUpdate(_id).exec((err, data) => {
        if (err) {
            return res.status(400).json({
                error: 'Failed to update bark'
            })
        }

        data.bark = updatedBark;
        data.save();


        res.json(data);
    })
}

// Delete bark:
const deleteBark = (req, res) => {
    const { _id } = req.params;

    Bark.findByIdAndDelete(_id).exec((err, data) => {
        if (err) {
            return res.status(400).json({
                error: 'Failed to delete bark!'
            })
        }

        return res.status(201).json({
            message: 'Bark removed!'
        })
    })
}

// Export Controllers:
module.exports = {
    viewBarks,
    createBark,
    updateBark,
    deleteBark
}