exports.compileTypeRocketAssets = function( public ) {
	var typerocket_elixir = require('laravel-elixir');

	typerocket_elixir.config.assetsPath = __dirname + '/assets';
	typerocket_elixir.config.publicPath = public;
	typerocket_elixir.config.sourcemaps = false;

	typerocket_elixir(function(mix) {
		// Directories
		var assets = typerocket_elixir.config.publicPath;

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

		// Move Fonts
		mix.copy(
			typerocket_elixir.config.assetsPath + '/fonts',
			assets + '/typerocket/fonts'
		);

		// Move JS
		mix.copy(
			typerocket_elixir.config.assetsPath + '/js/global.js',
			assets + '/typerocket/js/global.js'
		);

		mix.copy(
			typerocket_elixir.config.assetsPath + '/js/redactor.min.js',
			assets + '/typerocket/js/redactor.min.js'
		);

	});
};