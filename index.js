const express    = require('express')
const app        = express()
const PORT       = 8080

let port;
if ( process.argv.length > 2 && !isNaN( process.argv[2] ) ) {
    port = process.argv[2]
} else {
    port = 8080
}

app.use(express.static('www'))
app.listen(PORT)