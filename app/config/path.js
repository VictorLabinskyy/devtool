module.exports = {
    src: {
        css: "app/sss/**/*.sss",
        views: "app/views/pages/*.pug",
        images: "app/images/**/*.*",
        js: "app/js/**/*.js",
    },
    dist: {
        css: "dist/css",
        views: "dist",
        images: "dist/images",
        js: "dist/js"
    },
    watch: {
        css: "app/sss/**/*.sss",
        views: "app/views/**/*.pug",
        images: "app/images/**/*.*",
        js: "app/js/**/*.js"
    },
    webroot : "dist"
};