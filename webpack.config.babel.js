import path from 'path'
import { EnvironmentPlugin } from 'webpack'
import HtmlPlugin from 'html-webpack-plugin'
import CssExtractPlugin from 'mini-css-extract-plugin'
import BuildNotifPlugin from 'webpack-build-notifier'
import NodeExternals from 'webpack-node-externals'
import UglifyJsPlugin from 'uglifyjs-webpack-plugin'
import merge from 'webpack-merge'

export default (env = {}) => {
  const conf = initConfig({
    context: __dirname,
    mode: env.prod ? 'production' : 'development',
    notifsEnabled: !!env.notifs,
  })
  return conf
}

const extensions = ['.ts', '.tsx', '.js', '.jsx']
const htmlTemplate = path.resolve(__dirname, './src/index.html')
const mainConfig = {
  entry: './src/main/main.ts',
  target: 'electron-main',
  output: {
    filename: 'main.bundle.js',
    path: __dirname + '/dist',
  },
  node: {
    __dirname: false,
    __filename: false,
  },
}
const rendererConfig = {
  entry: './src/ui/renderer.tsx',
  target: 'electron-renderer',
  output: {
    filename: 'renderer.bundle.js',
    path: __dirname + '/dist',
  },
}

const initEnv = ({ mode }) => {
  const env = {
    VERSION: process.env.npm_package_version,
    NODE_ENV: mode,
  }
  return env
}

const initPlugins = ({
  mode = 'development',
  template,
  notifsEnabled = false,
}) => {
  const plugins = [
    new EnvironmentPlugin(initEnv({ mode })),
    new HtmlPlugin({
      title: 'Twint',
      template,
    }),
    new CssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
  ]

  if (notifsEnabled) {
    plugins.push(
      new BuildNotifPlugin({
        title: 'Twint Build',
      }),
    )
  }
  return plugins
}

const babelLoader = {
  loader: 'babel-loader',
}

const tsLoader = {
  loader: 'ts-loader',
  options: {
    happyPackMode: true,
  },
}

const extractStylesLoader = {
  loader: CssExtractPlugin.loader,
}

const sassLoader = {
  loader: 'sass-loader?sourceMap',
}

const cssModulesLoader = {
  loader: 'css-loader?sourceMap',
}

const initLoaderRules = ({ mode, context }) => {
  const main = {
    test: /\.(j|t)sx?$/,
    include: path.resolve(context, './src'),
    use: [babelLoader, tsLoader],
  }

  const styles = {
    test: /\.(sa|sc|c)ss$/,
    include: [
      path.resolve(context, './src'),
      path.resolve(context, './node_modules'),
    ],
    use: [extractStylesLoader, cssModulesLoader, sassLoader],
  }

  const imgLoader = {
    test: /\.(png|jpg|gif|svg)$/,
    include: [
      path.resolve(context, './img'),
      path.resolve(context, './node_modules'),
    ],
    loader: 'file-loader',
    options: {
      name: '[path][name].[ext]',
    },
  }
  const fontloader = {
    test: /\.(eot|woff|woff2|ttf)([?]?.*)$/,
    loader: 'file-loader',
    options: {
      name: '[name].[ext]',
    },
  }
  const svgLoader = [
    {
      test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
      use: [
        {
          loader: 'url-loader',
          options: {
            mimetype: 'image/svg+xml',
          },
        },
      ],
    },
    {
      test: /\.svg$/,
      loader: 'svg-inline-loader',
    },
  ]
  return [main, styles, imgLoader, fontloader, ...svgLoader]
}

const initMinizers = () => [
  new UglifyJsPlugin({
    cache: true,
    parallel: true,
    sourceMap: true,
    uglifyOptions: {
      output: { ascii_only: true },
    },
  }),
]

const initConfig = ({ context = __dirname, mode = 'development', ...opts }) => {
  const sharedConfig = {
    mode,
    devtool:
      mode === 'development'
        ? 'inline-cheap-module-source-map'
        : 'hidden-source-map',
    plugins: initPlugins({
      ...opts,
      mode,
      template: htmlTemplate,
    }),
    module: {
      rules: initLoaderRules({ mode, context }),
    },
    resolve: {
      extensions,
      symlinks: false,
      mainFields: ['browser', 'main', 'module'],
    },
    stats: {
      assetsSort: 'size',
      children: false,
      cached: false,
      cachedAssets: false,
      entrypoints: false,
      excludeAssets: /\.(png|svg)/,
      maxModules: 5,
    },
    performance: {
      hints: false,
    },
    externals: [NodeExternals()],
  }

  if (mode === 'production') {
    sharedConfig.optimization = {
      minimizer: initMinizers(),
    }
  }

  return [merge(mainConfig, sharedConfig), merge(rendererConfig, sharedConfig)]
}
