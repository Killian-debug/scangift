import HtmlWebpackPlugin from 'html-webpack-plugin'

module.exports = () => {

    return {
            entry: "./src/index.js",
            output: {
                publicPath: "/",
                filename: "[name].[hash].js",
                path: path.resolve(__dirname, "build")
            },
            plugins: [
                new HtmlWebpackPlugin({
                    hash: true,
                    template: "./public/index.html"
                }),
            ]
        }
};