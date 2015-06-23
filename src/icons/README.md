# Icon Generation

Icons placed here as svg files will be picked up and generated using the `iconFont` gulp task

You will need to add the following node dependencies in `package.json`

    "gulp-swig": "^0.7.4",
    "gulp-iconfont": "^1.0.0",

Files should be named with the pattern `<keycode>-<icon name>.svg`

eg.

    uE001-facebook.svg
    uE002-linkedin.svg

See the tagged commit `upstream-base` for an example of this with files populated

You will also need to import the generated `_icons.sass` file in `src/sass` in the main `app.sass`