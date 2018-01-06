let express = require('express')
let path = require('path')
let ejs = require('ejs')

let app = express()

app.enable('trust proxy')
// parse application/json
app.use(express.json())
// static
let options = {
    dotfiles: 'ignore',
    etag: false,
    extensions: ['htm', 'html'],
    index: false,
    maxAge: '1d',
    redirect: false,
    setHeaders: function (res, path, stat) {
        res.set('x-timestamp', Date.now())
    }
}
app.use(express.static(path.join(__dirname, 'public'), options))
// engine
app.engine('html', ejs.renderFile)
// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

// error handlers
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500)
    res.render('error', {
        message: err.message,
        error: err
    })
})

// routes
app.get('/', function(req, res){
    res.send('hello world')
})

app.get('/java', function (req, res, next) {
    const java = require('./common/javas')
    java.syncHashMap()
    res.send({err: null, data: 'success'})
})

app.set('port', process.env.PORT || 3000)

let server = app.listen(app.get('port'), function() {
    console.log('Express server listening on port ' + server.address().port)
})

server.on('Error', function (err) {
    console.log('APP Error: ' + JSON.stringify(err))
})