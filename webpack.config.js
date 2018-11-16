const VueLoaderPlugin = require('vue-loader/lib/plugin')
const htmlwebpackplugin=require("html-webpack-plugin");
const webpack=require("webpack");
const path=require("path")
module.exports={
	mode:"development",
	
	entry:"./src/main.js",

    output:{    
    	path:path.resolve(__dirname,"dist"),
    	filename:"[hash].bundle.js"
    },

    module:{
    	rules:[{
    		test:/\.vue$/,
    		loader:"vue-loader"
    	},
	    {
	       test: /\.js$/,
	       loader: 'babel-loader',
	       exclude: /node_modules/
	    },
    	{
    		test:/\.css$/,
    		loader:"style-loader!css-loader"
    	},{
    		test:/\.(jpg|svg|png|gif)$/,
    		loader:"url-loader",
    		options:{
    			limit:8192,
    			name:"[chunk].[id].[ext]"

    		}
    	},
        {
            test:/\.(eot|woff|woff2|ttf)$/,
            loader:"file-loader"
        }
    	]
    },
     plugins: [
     //坑：注意大写;
    // 请确保引入这个插件！
    new VueLoaderPlugin(),
    new htmlwebpackplugin({
    	template:"a.html"
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.ProvidePlugin({
    $: 'jquery',
    jQuery: 'jquery',
    Popper: ['popper.js', 'default']      
    }),
    new webpack.DefinePlugin({

    })
  ],
  resolve:{
    alias:{
        nm:path.resolve(__dirname,"./node_modules")
    }
  },
  devServer:{
  	historyApiFallback:true,
  	noInfo:true,
    publicPath:"/"
  }
}
