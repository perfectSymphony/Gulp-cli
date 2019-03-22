// https://github.com/michael-ciniawsky/postcss-load-config

module.exports = {
  "plugins": {
    // 引入内联样式表的方法
    'postcss-import': {},
    //下一版css
    'postcss-cssnext': {
      'warnForDuplicates': false
    },
    // 自动添加前缀
    "autoprefixer": {
      "browsers": [
        "> 1%",
        "last 6 versions",
        "not ie < 8"
      ]
    },

  }
}
