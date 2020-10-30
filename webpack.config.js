const path = require('path')

module.exports = {
  mode: 'development',

  entry: './src/index.ts',
  output: {
    path: path.resolve(__dirname, 'dist'),
    library: 'time-series',
    libraryTarget: 'umd',
    filename: 'time-series.umd.js',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json'],
  },
  plugins: [
  ],
  module: {
    rules: [
      {
        // Include ts, tsx, and js files.
        test: /\.(tsx?)|(js)$/,
        exclude: /node_modules/,
        loader: 'ts-loader',
      },
    ],
  },
}