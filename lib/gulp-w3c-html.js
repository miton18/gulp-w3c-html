var PluginError, ext, extend, request, through, fs;
fs          = require('fs');
color       = require('colors/safe');
extend      = require('util')._extend;
through     = require('through2');
ext         = require('gulp-util').replaceExtension;
PluginError = require('gulp-util').PluginError;
request     = require('request');

module.exports = function(options) {
    

  var checkHTML = function(file, enc, cb) {
        
    var contents, e, error, ref, reqOpt;
    
    if( file.isStream() ) {
        return cb(new PluginError('gulp-check-html', 'Streaming not supported'));
    }
    
    if (file.isBuffer()) {
      try {
        
        reqOpt = {
          url: 'https://validator.w3.org/nu/?out=json',
          method: 'POST',    
          headers: {
              "Content-type": "text/html"
          },
          file: {
            chunked: false,  
            data: [
              {
                'content-type': 'text/html',
                body: file.contents
              }
            ]
          }
        };
          
        return request(reqOpt, function(err, res, body) {
            var messages = JSON.parse(body).messages
            
            for( var i=0; i< messages.length; i++ ) {
                console.log( color.green(file.path) 
                    + " "  + color.red(messages[i].type) 
                    + ": " + messages[i].message );
            }
            return cb(null, file);
        });
      } catch (error) {
          
        return cb(new PluginError('gulp-check-html', error));
      }
    }
  };
  return through.obj(checkHTML);
};