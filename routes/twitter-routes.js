const express = require('express')
const router = express.Router();
const _ = require('twitter-api-client');

const Tweet = require('../models/Tweets')
const utils = require('../Utils/utils')


const twitterClient = new _.TwitterClient({
    apiKey: 'KEHrlRpnkPEMcJA6eF0M5oJ5J',
    apiSecret: 'G6HEelOnodmXSOU6xUAihVWQXZmcg2oGK2R51YUIHXV9w0FRGl',
    accessToken: '1041919093081874432-kgbpZC216sxuIinifQ0SHllLMEBBzU',
    accessTokenSecret: 'QqMEzBWukX2mTSlc6WoWnHnL8OADfLWNTHOkX4jKFQuFt'
})

router.get('/:id', async (req, res) => {
    const hashtag = req.params.id
    const search_query = `#${hashtag}`
    let data = null;
    try {
        data = await twitterClient.tweets.search({ q: search_query });
        data.statuses.forEach(async (tweet) => {
            try {
                await new Tweet({
                    id: tweet.id_str,
                    description: tweet.text,
                    created: tweet.created_at,
                    user: {
                        id: tweet.user.id_str,
                        name: tweet.user.name,
                        handle: tweet.user.screen_name,
                        location: tweet.user.location,
                        timezone: tweet.user.time_zone
                    },
                    retweetCount: tweet.retweet_count,
                    favouriteCount: tweet.favorite_count
                }).save()
                console.log("tweet saved")
            }
            catch(err) { console.log("error occured") }
        });
    }
    catch (err) {
        data = err
    }
    res.json(data);
})

router.get('/', async (req, res) => {
    const query = req.query
    const query_string = utils.retrieveQueryString(query)
    
    try {
        const data = await twitterClient.tweets.search({ q:query_string})
        res.json(data)
    }
    catch (err) {
        res.json({ error: err })
    }
})

module.exports = router;