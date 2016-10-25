var path = require('path'),
    
    pug = require('pug');

describe("pug-php-filter", function(){
    var phpFilter = require('../')
        testFilePath = path.join(__dirname, 'test.pug');

    it("wraps text in php tags", function(){
        var result = pug.renderFile(testFilePath, {
            filters: {
                php: phpFilter
            }
        });

        expect(result).toMatch(/^<\?php.*\?>$/);
    });

})
