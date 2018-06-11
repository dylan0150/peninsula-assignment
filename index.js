const express    = require('express')
const bodyParser = require('body-parser')
const app        = express()

let port;
if ( process.argv.length > 2 && !isNaN( process.argv[2] ) ) {
    port = process.argv[2]
} else {
    port = 8080
}

app.use(express.static('www'))
app.use(bodyParser.json())

app.options('*', function(request, response) {
    response.end()
})
app.post('/api/files', function(request, response) {
    const endpoint = require('./api/files')
    response.send( endpoint.post(request) )
    response.end()
})
app.get('/api/files', function(request, response) {
    const endpoint = require('./api/files')
    response.send( endpoint.get(request) )
    response.end()
})

app.listen(port)