module.exports = new Files()
const fs       = require('fs')

function Files() {

}
Files.prototype.recursiveSearch = function(files, search_param) {
    const self = this;

    return files.filter(function(e, i) {
        if ( e.name != undefined && e.name.toLowerCase().indexOf(search_param.toLowerCase()) > -1 ) {
            return true
        }
        if ( e.type != undefined && e.type.toLowerCase().indexOf(search_param.toLowerCase()) > -1 ) {
            return true
        }
        if ( e.files != undefined ) {
            e.files = self.recursiveSearch(e.files, search_param)
            if (e.files.length > 0) {
                e.expanded = true
                return true
            }
        }
        return false
    })
}
Files.prototype.get = function(request) {
    return {
        name: "/",
        expanded: true,
        type: "folder",
        files: JSON.parse(fs.readFileSync(process.cwd()+'/api/files.json','UTF-8'))
    }
}
Files.prototype.post = function(request) {

    const files        = JSON.parse(fs.readFileSync(process.cwd()+'/api/files.json','UTF-8'))
    var filtered_files = files

    if ( request.body.search != undefined && typeof request.body.search == "string" && request.body.search.length > 0 ) {
        filtered_files = this.recursiveSearch(files, request.body.search)
    }

    return {
        name: "/",
        expanded: true,
        type: "folder",
        files: filtered_files
    }
}