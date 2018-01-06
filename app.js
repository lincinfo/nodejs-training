let express = require('express')
let path = require('path')
let ejs = require('ejs')

let port = 3000
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
// error handling
app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Something broke!');
})

// routes
app.get('/', function(req, res){
    res.send('hello world')
})

app.listen(port, function(req, res){
    console.log('DEBUG: express app start at port[' + port + ']......')
})