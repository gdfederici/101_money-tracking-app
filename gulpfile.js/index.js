const gulp = require("gulp");
const series = gulp.series;
const paths = require("./paths");
const viewTasks = require("./viewTasks");
const jsTasks = require("./jsTasks");
const assetsTasks = require("./assetsTask");
const serveTasks = require("./serveTasks");
const del = require("del");

const clean = function(cb) {
    del.sync(paths.getDistFolder(), { force: true });
    cb();
}

const build = series(clean, viewTasks.compileIndex, assetsTasks.processCSS, assetsTasks.watchCSS, jsTasks.bundleJs, jsTasks.watchJS, viewTasks.watchIndex, serveTasks.serve);

module.exports = {
    build: build
};