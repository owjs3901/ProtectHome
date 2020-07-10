module.exports = {
	devServer: {
		port:'1004',
		contentBase: './',
		publicPath: '/dist',
		historyApiFallback:true,
		proxy:{
			'/api/**': {
				target:'http://localhost:3000',
				secure:false
			}
		}
	}
};
