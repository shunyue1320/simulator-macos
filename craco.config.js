const CracoLessPlugin = require("craco-less");

module.exports = {
  babel: {
    plugins: [["@babel/plugin-proposal-decorators", { legacy: true }]]
  },
  style: {
    postcss: {
      plugins: [require("tailwindcss"), require("autoprefixer")]
    }
  },
  plugins: [
    {
      plugin: CracoLessPlugin
    }
  ]
};
