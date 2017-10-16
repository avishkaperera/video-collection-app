const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Video = require('../models/video');

const db = 'mongodb://db_username:db_password@ds149954.mlab.com:49954/videoplayer';
mongoose.Promise = global.Promise;

mongoose.connect(db, function(err) {
    if (err) {
        console.log('connection error :' + err);
    } else {
        console.log('connected to db');
    }
});

// ENDPOINT TO GET ALL VIDEOS FROM THE DATABASE
router.get('/videos', function(req, res) {
    console.log('GET request to /videos');
    Video.find({}).exec(function(err, videos) {
        if (err) {
            console.log('Error getting videos :' + err);
        } else {
            res.json(videos);
        }
    });
});

// ENDPOINT TO GET A SINGLE VIDEO FROM THE DATABASE
router.get('/video/:id', function(req, res) {
    console.log('GET request to /video/:id');
    Video.findById(req.params.id).exec(function(err, video) {
        if (err) {
            console.log('Error getting video :' + err);
        } else {
            res.json(video);
        }
    });
});

// ENDPOINT TO POST / CREATE A NEW VIDEO TO THE DATABASE
router.post('/video', function(req, res) {
    console.log('POST request to /video');

    var newVideo = new Video();
    newVideo.title = req.body.title;
    newVideo.url = req.body.url;
    newVideo.description = req.body.description;
    newVideo.save(function(err, insertedVideo) {
        if (err) {
            console.log('could not save video :' + err);
        } else {
            res.json(insertedVideo);
        }
    });
});

// ENDPOINT TO PUT / UPDATE A VIDEO IN THE DATABASE
router.put('/video/:id', function(req, res) {
    console.log('PUT request to /video/:id');

    Video.findByIdAndUpdate(req.params.id, {
        $set: { title: req.body.title, url: req.body.url, description: req.body.description }
    }, { new: true }, function(err, updatedVideo) {
        if (err) {
            console.log('could not update video :' + err);
        } else {
            res.json(updatedVideo);
        }
    });
});

// ENDPOINT TO DELETE A VIDEO FROM THE DATABASE
router.delete('/video/:id', function(req, res) {
    console.log('DELETE request to /video/:id');

    Video.findByIdAndRemove(req.params.id, function(err, deletedVideo) {
        if (err) {
            res.send('could not delete video :' + err);
        } else {
            res.send(deletedVideo);
        }
    })
});
module.exports = router;
