import HtmlWebpackPlugin from 'html-webpack-plugin'

export const plugins = [
    new HtmlWebpackPlugin({
        hash: true
    })
]