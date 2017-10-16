# VIDEO COLLECTION APP
A simple video collection application done using MEAN stack.

## GETTING STARTED
clone the project to your local environment using `git clone https://github.com/avishkaperera/video-collection-app.git` and then run `npm install` to get all the relevant node modules installed on your local development environment to get started with the project. After that run `ng build` to build the Angular project. A directory named **dist** will be created and build files of the Angular application will be stored in this directory.

Node Express server will find the *index.html* inside **dist** directory to find the Angular application running within the server environment. This way you do not need to run the server and the application separately.

```javascript
app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
});
```

### PREREQUISITE
You should have NodeJS and npm installed on your local machine to run this application.



This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.4.3.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
