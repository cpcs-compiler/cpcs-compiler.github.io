const { src, dest, watch, task, parallel } = require("gulp");
const nunjucks = require("gulp-nunjucks-render");
const uglify = require("gulp-uglify-es").default;
const sass = require("gulp-sass");
const concat = require("gulp-concat");
const cssnano = require("gulp-cssnano");
const browsersync = require("browser-sync");

const buildCss = () =>
  src("src/scss/style.scss")
    .pipe(sass())
    .pipe(cssnano())
    .pipe(dest("dist/assets"))
    .pipe(browsersync.reload({ stream: true }));

const buildJs = () =>
  src("src/scripts/*.js")
    .pipe(concat("script.js"))
    .pipe(uglify())
    .pipe(dest("./dist/assets"))
    .pipe(browsersync.reload({ stream: true }));

const buildHtml = () =>
  src("src/pages/*.njk")
    .pipe(
      nunjucks({
        path: ["src/templates"],
      })
    )
    .pipe(dest("./dist"))
    .pipe(browsersync.reload({ stream: true }));

watch(["src/pages/*.njk"], buildHtml);
watch(["src/scripts/*.ls"], buildJs);
watch(["src/scss/*.scss", "src/scss/**/*.scss"], buildCss);
watch(["dist/*"]).on("change", browsersync.reload);

task("html", buildHtml);
task("js", buildJs);
task("css", buildCss);
task("build", parallel(buildHtml, buildCss, buildJs));
task("serve", () =>
  browsersync.init({
    server: {
      baseDir: "./dist",
      index: "index.html",
    },
    notify: false,
    injectChanges: true,
  })
);
