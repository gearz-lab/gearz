import webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

export default {
    entry: [
        './app/appClient.js'
    ],

    output: {
        filename: 'bundle.js',
        path: './dist/assets',
        publicPath: '/assets/'
    },

    externals: undefined,

    resolve: {
        extensions: ['', '.js', '.json']
    },

    module: {
        loaders: [
            {test: /\.js/, loaders: ['babel'], exclude: /node_modules/ },
            {test: /\.jsx/, loaders: ['babel'], exclude: /node_modules/ },
            {test: /\.css/, loader: ExtractTextPlugin.extract("style-loader", "css-loader")},
            {test: /\.less$/, loader:  ExtractTextPlugin.extract("style-loader", "css-loader!less-loader")},
            {test: /\.json$/, loader: 'json'},
            {test: /\.jpe?g$|\.gif$|\.png$|\.ico$/, loader: 'file?name=[name].[ext]'},
            {test: /\.eot|\.ttf|\.svg|\.woff2?/, loader: 'file?name=[name].[ext]'}
        ]
    },

    plugins: [
        new ExtractTextPlugin('[name].css'),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': "'production'"
            }
        })
        //new webpack.optimize.UglifyJsPlugin({
        //    compress: {
        //        warnings: false
        //    }
        //})
    ]
};
