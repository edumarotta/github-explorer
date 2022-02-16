const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const { TRUE } = require('node-sass');


const isDevelopment = process.env.NODE_ENV !== 'production';


module.exports = {
    mode: isDevelopment ? 'development' : 'production',
    devtool: isDevelopment ? 'eval-source-map' : 'source-map',
    entry: path.resolve(__dirname, 'src', 'index.tsx'), //Arquivo de entrada3
    output: {                                           //saida
        path: path.resolve(__dirname, 'dist'),          //pasta de saida
        filename: 'bundle.js'                           //arquivo de saida                                 
    },
    resolve: {
        extensions:['.js', '.jsx', '.ts', '.tsx'],
    },
    devServer: {
        hot: true,
    },

    plugins: [
        isDevelopment && new ReactRefreshWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'public', 'index.html'),
        })
    ].filter(Boolean),
    module: {                           //Aqui vai falar como vai lidar com cada tipo de aqruivo
        rules: [
            {
                test: /\.(j|t)sx$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        plugins: [
                            isDevelopment && require.resolve('react-refresh/babel')

                        ].filter(Boolean)
                    }
                
                }
            },

            {
                test: /\.scss$/,
                exclude: /node_modules/,
                use: ['style-loader', 'css-loader', 'sass-loader'],

            }
        ],
    }
};