// vue.config.js
const path = require("path");
const BundleAnalyzerPlugin =
  require("webpack-bundle-analyzer").BundleAnalyzerPlugin; // 打包分析
const IS_PROD = ["production", "prod"].includes(process.env.NODE_ENV);
const resolve = (dir) => path.join(__dirname, dir);
//全局文件路径
const glob = require("glob-all");

//环境
// const targetPath = 'http://dev.dcyijian.com';//测试环境
const targetPath = 'https://new.dcyijian.com';//正式环境

module.exports = {
  publicPath: "./", // 公共路径
  indexPath: "index.html", // 相对于打包路径index.html的路径
  outputDir: process.env.outputDir || "dist", // 'dist', 生产环境构建文件的目录
  assetsDir: "static", // 相对于outputDir的静态资源(js、css、img、fonts)目录
  lintOnSave: false, // 是否在开发环境下通过 eslint-loader 在每次保存时 lint 代码
  runtimeCompiler: true, // 是否使用包含运行时编译器的 Vue 构建版本
  productionSourceMap: !IS_PROD, // 生产环境的 source map
  parallel: require("os").cpus().length > 1, // 是否为 Babel 或 TypeScript 使用 thread-loader。该选项在系统的 CPU 有多于一个内核时自动启用，仅作用于生产构建。
  pwa: {}, // 向 PWA 插件传递选项。
  chainWebpack: (config) => {
    config.resolve.symlinks(true); // 修复热更新失效
    // 如果使用多页面打包，使用vue inspect --plugins查看html是否在结果数组中
    config.plugin("html").tap((args) => {
      // 修复 Lazy loading routes Error
      args[0].chunksSortMode = "none";
      return args;
    });
    config.resolve.alias // 添加别名
      .set("@", resolve("src"));

    config.module.rule("svg").exclude.add(resolve("src/assets/icons")).end();
    config.module
      .rule("icons")
      .test(/\.svg$/)
      .include.add(resolve("src/assets/icons"))
      .end()
      .use("svg-sprite-loader")
      .loader("svg-sprite-loader")
      .options({
        symbolId: "icon-[name]",
      })
      .end();
    // 压缩图片
    // 需要 npm i -D image-webpack-loader
    config.module
      .rule("images")
      .use("image-webpack-loader")
      .loader("image-webpack-loader")
      .options({
        mozjpeg: { progressive: true, quality: 65 },
        optipng: { enabled: false },
        pngquant: { quality: [0.65, 0.9], speed: 4 },
        gifsicle: { interlaced: false },
        webp: { quality: 75 },
      });
    // 打包分析, 打包之后自动生成一个名叫report.html文件(可忽视)
    if (IS_PROD) {
      config.plugin("webpack-report").use(BundleAnalyzerPlugin, [
        {
          analyzerMode: "static",
        },
      ]);
    }
  },
  css: {
    extract: IS_PROD,
    loaderOptions: {
      // postcss: {
      //   postcssOptions: {
      //     plugins: [postcss],
      //   },
      // },
    },
  },
  devServer: {
    host: "0.0.0.0",
    port: 8080, // 端口号
    // public: "192.168.2.12:8080",
    https: false, // https:{type:Boolean}
    // open: false, //配置自动启动浏览器
    // hotOnly: true, // 热更新
    // proxy: {
    //   '/api': {
    //     target: targetPath,
    //   }

    // },
  },
};
