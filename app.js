let express = require('express')
let path = require('path')
//let logger = require('morgan')
let cookieParser = require('cookie-parser')
let bodyParser = require('body-parser')

// let routes = require('./routes/index')
// let users = require('./routes/users')

let app = express()

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'))
//app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.get('/java', function (req, res, next) {
    const java = require('./common/javas')
    java.syncHashMap()
    res.send({err: null, data: 'success'})
})

// app.use('/', routes);
// app.use('/users', users);

// error handlers
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500)
    res.render('error', {
        message: err.message,
        error: err
    })
})

app.set('port', process.env.PORT || 3000)

let server = app.listen(app.get('port'), function() {
    console.log('Express server listening on port ' + server.address().port)
})

server.on('Error', function (err) {
    console.log('APP Error: ' + JSON.stringify(err))
})