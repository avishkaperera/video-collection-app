# VIDEO COLLECTION APP
A simple video collection application done using MEAN stack.

### PREREQUISITE
You should have NodeJS and npm installed on your local machine to run this application.

## GETTING STARTED
clone the project to your local environment using `git clone https://github.com/avishkaperera/video-collection-app.git` and then run `npm install` to get all the relevant node modules installed on your local development environment to get started with the project. After that run `ng build` to build the Angular project. A directory named **dist** will be created and build files of the Angular application will be stored in this directory.

Node Express server will find the *index.html* inside **dist** directory to find the Angular application running within the server environment. This way you do not need to run the server and the application separately.

```javascript
app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
});
```
## DATABASE
This application uses an instance of **MongoDB** from **mLab** as the database.

You can go to: https://mlab.com/ and create a database instance for yourself and use the credentials in your application to access the database.

Import `mongoose` module to conveniently do database operations

`const mongoose = require('mongoose');`

Connect to the database

```javascript
const db = 'mongodb://url-to-mlab-database-instance/videoplayer';
mongoose.Promise = global.Promise;

mongoose.connect(db, function(err) {
    if (err) {
        console.log('connection error :' + err);
    } else {
        console.log('connected to db');
    }
});
```

## ENDPOINTS

### GET VIDEOS
```javascript
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
```

### GET SINGLE VIDEO
```javascript
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
```

### POST VIDEO
```javascript
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
```

### UPDATE VIDEO
```javascript
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
```

### DELETE VIDEO
```javascript
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
```

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.4.3.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
