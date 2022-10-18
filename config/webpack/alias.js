const path = require("path");

module.exports = {
  resolve: {
    alias: {
      apis: "src/apis",
      common: "src/common",
      components: "src/components",
      neetoui: "@bigbinary/neetoui",
      neetoicons: "@bigbinary/neeto-icons",
      utils: "src/utils",
      constants: "src/constants",
      contexts: "src/contexts",
      images: path.resolve(__dirname, "../", "../", "app/assets/images"),
    },
  },
};
