module.exports = {
	devServer: {
		port:'1000',
		contentBase: './',
		publicPath: '/dist',
		historyApiFallback:true,
		proxy:{
			'/api/**': {
				target:'http://localhost:3001',
				secure:false
			}
		}
	}
};
