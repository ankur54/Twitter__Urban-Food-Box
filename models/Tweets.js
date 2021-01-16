const mongoose = require('mongoose')

const TweetSchema = mongoose.Schema({
    id: String,
    description: String,
    created: String,
    user: {
        id: String,
        name: String,
        handle: String,
        location: String,
        timezone: String
    },
    retweetCount: Number,
    favouriteCount: Number
})

module.exports = mongoose.model('Tweets', TweetSchema)