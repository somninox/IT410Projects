var gulp 			= require('gulp');

var sass 			= require('gulp-sass');
var autoprefixer 	= require('gulp-autoprefixer');
var csso 			= require('gulp-csso');
var htmlmin 		= require('gulp-htmlmin');
var imagemin  		= require('gulp-imagemin');
var uglify 			= require('gulp-uglify');
var useref  		= require('gulp-useref');
var changed 		= require('gulp-changed');

gulp.task('hello', function(){
	console.log('Hello Whitney');
});

gulp.task('sass', function(){
 return gulp.src('src/scss/**/*.scss')
 	.pipe(changed('app/css'))
	.pipe(sass())
	.pipe(autoprefixer('last 2 version'))
	.pipe(csso())
	.pipe(useref())
	.pipe(gulp.dest('app/css'));
});

gulp.task('css', function(){
 return gulp.src('src/css/**/*.css')
 	.pipe(changed('app/css'))
	.pipe(autoprefixer('last 2 version'))
	.pipe(csso())
	.pipe(useref())
	.pipe(gulp.dest('app/css'));
});

gulp.task('htmlmin', function(){
	return gulp.src('src/html/**/*.html')
		.pipe(changed('app/html'))
		.pipe(htmlmin({collapseWhitespace: true}))
		.pipe(gulp.dest('app/html'));
});

gulp.task('imagemin', () => {
	return gulp.src('src/images/**/*')
		.pipe(changed('app/images'))
		.pipe(imagemin({
			progressive: true,
			svgoPlugins: [{removeViewBox: false}],
		}))
		.pipe(gulp.dest('app/images'));
});

gulp.task('java', function(){
	return gulp.src('src/javascript/**/*.js')
		.pipe(changed('app/javascript'))
		.pipe(uglify()).on('error', function(e){
            console.log(e);
         })
		.pipe(useref())
		.pipe(gulp.dest('app/javascript'));
})

gulp.task('watch', function(){
	gulp.watch('src/scss/**/*.scss', ['sass']);
	gulp.watch('src/css/**/*.css', ['css']);
	gulp.watch('src/html/**/*.html', ['htmlmin']);
	gulp.watch('src/images/**/*', ['imagemin']);
	gulp.watch('src/javascript/**/*.js', ['java']);
});
