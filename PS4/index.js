const express = require('express');
const router = express.Router();
const request = require('request');
const {response} = require("express");
const fetch = require('node-fetch');
const https = require('https');
const dotenv = require('dotenv').config()
const redis = require('redis')

/* Using API from https://sunrise-sunset.org/api
   Returns sunset and sunrise time with given coordinates */

// uri is https://api.sunrise-sunset.org/json?
const uri = process.env.API_URI

// Redis caching, implemented in part C: async await function
const REDIS_PORT = 6379
const client = redis.createClient(REDIS_PORT)
client.on("error", (error) => console.error(error));

/* Home View*/
router.get('/', async function(req, res, next) {
    res.render('index', {title: 'Calling API from https://sunrise-sunset.org/api, using three methods'})
})


/* problem B, post using promises */
router.post('/post', function (req, res, next) {
    return new Promise((resolve, reject) => {
        request(uri + `lat=${req.body.lat}&lng=${req.body.lng}`, (err, response, body) => {
            if (response.statusCode == 200) {
                resolve(body);
            } else {
                reject(response);
            }
        });
    })
        .then((result) => {
                //resolve
                let resultObj = JSON.parse(result).results
                res.render('index', {sunrise: resultObj.sunrise, sunset: resultObj.sunset});
            },
            //reject
            (result) => {
                res.render('index', {title: response.statusMessage});
            }
        );
})


// Problem C, post using async await with fetch
// Added redis caching
router.post('/fetch-post', async function(req, res, next) {
    client.get(req.body.lat, async (_, cached_data) => {
        if (cached_data) {
            //send the response from cache
            return res.send({
                success: true,
                message: JSON.parse(cached_data),
                meta_data: "from cache",
            });
        } else {
            //fetch the data.
            const fetchData = await fetch(uri + `lat=${req.body.lat}&lng=${req.body.lng}`)
            const data = await fetchData.json();
            //set the data on cache
            client.set(req.body.lat, JSON.stringify(data));

            // set cache to expire in 15 seconds
            client.expire(req.body.lat, 15);

            // send response indicating the result is from the server
            return res.send({
                success: true,
                message: data.results,
                meta_data: "from server",
            });
            //res.render('index', {sunrise: data.results.sunrise, sunset: data.results.sunset});
        }
    });
})


/* Problem D, post using HTTPS request */
router.post('/request-post', function(req, res, next){
    const callback = function(response) {
        let str = '';

        //another chunk of data has been received, so append it to `str`
        response.on('data', function (chunk) {
            str += chunk;
        });

        //the whole response has been received, so we just print it out here
        response.on('end', function () {
            const result = JSON.parse(str).results
            res.render('index', {sunrise: result.sunrise, sunset: result.sunset});
        });
    }
    https.request(uri + `lat=${req.body.lat}&lng=${req.body.lng}`, callback).end();
})

module.exports = router;