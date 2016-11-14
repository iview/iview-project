/**
 * Created by aresn on 16/7/5.
 */

var webpack = require('webpack');
var config = require('./webpack.base.config');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var fs = require('fs');

config.output.publicPath = './dist/';                        // 资源路径,根据需要可改为cdn地址
config.output.filename = '[name].[hash].js';                 // 带hash值的入口js名称
config.output.chunkFilename = '[name].[hash].chunk.js';      // 带hash值的路由js名称

config.vue = {
    loaders: {
        css: ExtractTextPlugin.extract(
            "style-loader",
            "css-loader",
            {
                publicPath: "../dist/"
                // 特别提醒,如果这里的publicPath是以http://xxx.xxx这样以http://开头的,要写成
                // publicPath: "http:\\xxx.xxx",否则会编译为"http:/xxx.xxx"
            }
        ),
        less: ExtractTextPlugin.extract(
            'vue-style-loader',
            'css-loader!less-loader'
        ),
        sass: ExtractTextPlugin.extract(
            'vue-style-loader',
            'css-loader!sass-loader'
        )
    }
};

config.plugins = (config.plugins || []).concat([
    new ExtractTextPlugin("[name].[hash].css",{ allChunks : true,resolve : ['modules'] }),       // 提取带hash值的css名称
    new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.[hash].js'),                     // 提取带hash值的第三方库名称
    new webpack.DefinePlugin({
        'process.env': {
            NODE_ENV: '"production"'
        }
    }),
    new webpack.optimize.UglifyJsPlugin({                                                         // 压缩文件
        compress: {
            warnings: false
        }
    }),
    new HtmlWebpackPlugin({                                                                        // 构建html文件
        filename: '../index_prod.html',
        template: './src/template/index.ejs',
        inject: false
    })
]);

// 写入环境变量
fs.open('./src/config/env.js', 'w', function (err, fd) {
    var buf = 'export default "production";';
    fs.write(fd,buf,0,buf.length,0,function(err,written,buffer){});
});

module.exports = config;