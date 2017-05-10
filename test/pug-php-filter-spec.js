var path = require('path');

var pug = require('pug');
var gulp = require('gulp');
var chai = require('chai');
var through2 = require('through2');

var expect = chai.expect;

describe('pug-php-filter', function(){
    var phpFilter = require('../');
    var testFilePath = path.join(__dirname, 'test.pug');

    it('wraps text in php tags', function(){
        var result = pug.renderFile(testFilePath, {
            filters: {
                php: phpFilter
            }
        });

        expect(result).to.match(/^<\?php.*\?>$/);
    });

    it('can be used in a gulp pipe', function(done){
        gulp.src(testFilePath)
	    .on('end', done)
            .pipe( require('gulp-pug')( { filters: { php: phpFilter } } ) )
            .pipe(through2.obj(function (file, enc, callback) {
		expect(file.contents).to.match(/^<\?php.*\?>$/);
		callback(null, file)
	    }))
    });
})
