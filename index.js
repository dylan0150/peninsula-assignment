const  connect    = require('connect');
const serveStatic = require('serve-static');

let port;
if ( process.argv.length > 2 && !isNaN( process.argv[2] ) ) {
    port = process.argv[2]
} else {
    port = 8080
}


connect().use(serveStatic("www")).listen(port, function(){
    console.log('Server running on 8080...');
});