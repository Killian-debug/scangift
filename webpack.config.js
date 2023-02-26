import HtmlWebpackPlugin from 'html-webpack-plugin'

module.exports = () => {

    return {
            entry: "./src/index.js",
            output: {
                publicPath: "/",
                filename: "[hash].[name].js",
                path: path.resolve(__dirname, "build")
            },
            plugins: [
                new HtmlWebpackPlugin({
                    hash: false,
                    template: "./public/index.html"
                }),
            ]
        }
};