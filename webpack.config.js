module.exports = {
	devServer: {
		port:'3000',
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
