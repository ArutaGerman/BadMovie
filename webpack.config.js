const { VueLoaderPlugin } = require('vue-loader')

module.exports = {
  module: {
    entry: ['whatwg-fetch', 'src'],
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.js$/,
        loader: 'babel-loader'
      },
      {
        test: /\.s(c|a)ss$/,
        use: [
          'vue-style-loader',
          'css-loader',
          {
            loader: 'sass-loader',
            // Requires sass-loader@^8.0.0
            options: {
              implementation: require('sass'),
              sassOptions: {
                indentedSyntax: true // optional
              },
            },
          },
        ],
      },
    ],
  },
  plugins: [
    // убедитесь что подключили плагин!
    new VueLoaderPlugin()
  ]
}