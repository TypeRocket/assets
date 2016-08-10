exports.compileTypeRocketAssets = function( public ) {
	var typerocket_elixir = require('laravel-elixir');
	var gulp = require('gulp');

	var originalAssets = typerocket_elixir.config.assetsPath;
	var originalPublic = typerocket_elixir.config.publicPath;
	var originalMaps = typerocket_elixir.config.sourcemaps ;

	typerocket_elixir.config.assetsPath = __dirname + '/assets';
	typerocket_elixir.config.publicPath = public;
	typerocket_elixir.config.sourcemaps = false;

	typerocket_elixir(function(mix) {
		// Directories
		var assets = typerocket_elixir.config.publicPath;
		var resource = typerocket_elixir.config.assetsPath;

		// TypeRocket Core Assets
		mix.coffee([
			'http.coffee',
			'booyah.coffee',
			'typerocket.coffee',
			'items.coffee',
			'media.coffee',
			'matrix.coffee',
			'builder.coffee',
			'seo.coffee',
			'link.coffee',
			'dev.coffee'
		], assets + '/typerocket/js/core.js' );
		mix.sass('typerocket.scss', assets + '/typerocket/css/core.css' );

		// Move Fonts and JS
		gulp.src( resource + '/fonts/*.{ttf,woff,eof,eot,svg}' )
			.pipe( gulp.dest( assets + '/typerocket/fonts') );

		gulp.src( resource + '/js/global.js' )
			.pipe( gulp.dest( assets + '/typerocket/js' ) );

		gulp.src( resource + '/js/redactor.min.js' )
			.pipe( gulp.dest( assets + '/typerocket/js' ) );

		// Reset
		typerocket_elixir.config.assetsPath = originalAssets;
		typerocket_elixir.config.publicPath = originalPublic;
		typerocket_elixir.config.sourcemaps = originalMaps;
	});
};