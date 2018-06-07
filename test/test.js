const assert = require('assert');
const files  = require(process.cwd() + '/api/files')

describe("Api", function() {
    describe("files", function() {
        describe("GET", function() {
            it('should return a root file', function() {
                assert.equal( "/", files.get().name )
            })
            it('should be expanded', function() {
                assert.equal( true, files.get().expanded )
            })
            it('should contain an array of files', function() {
                assert.equal( true, Array.isArray(files.get().files) )
            })
        })
        describe("POST", function() {

            var req = {
                body: {}
            }

            it('should return a root file', function() {
                assert.equal( "/", files.post(req).name )
            })
            it('should be expanded', function() {
                assert.equal( true, files.post(req).expanded )
            })
            it('should contain an array of files', function() {
                assert.equal( true, Array.isArray(files.post(req).files) )
            })
            it('should return no results to a search for 23647£"$^)£bnJKDFB*S)DF', function() {
                req.body.search = '23647£"$^)£bnJKDFB*S)DF'
                assert.equal( 0, files.post(req).files.length )
            })
            it('should return one result to a search for Chr', function() {
                req.body.search = 'Chr'
                assert.equal( 1, files.post(req).files.length )
            })
            it('should be called Misc', function() {
                req.body.search = 'Chr'
                assert.equal( "Misc", files.post(req).files[0].name )
            })
            it('should also be expanded', function() {
                req.body.search = 'Chr'
                assert.equal( true, files.post(req).files[0].expanded )
            })
            it('should have a child called "Christmas party"', function() {
                req.body.search = 'Chr'
                assert.equal( "Christmas party", files.post(req).files[0].files[0].name )
            })
        })
    })
})