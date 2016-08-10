exports.compileTypeRocketAssets = function( public ) {
	var elixir = require('laravel-elixir');

	elixir.config.assetsPath = './assets';
	elixir.config.publicPath = public;
	elixir.config.sourcemaps = false;

	elixir(function(mix) {
	    // Directories
	    var assets = elixir.config.publicPath;

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

	});
}

