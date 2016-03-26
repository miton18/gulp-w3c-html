# gulp-w3c-html

An html checker with W3C rules

# How to use it


    npm install gulp-w3c-html

### 

    w3cHtml = require("gulp-w3c-html");
    gulp.src("./*.html")
    .pipe(w3cHtml());