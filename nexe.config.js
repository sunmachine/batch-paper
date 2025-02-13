module.exports = {
  input: "./dist/index.js",
  build: true,
  patches: [
    async (compiler, next) => {
      await compiler.setFileContentsAsync(
        "lib/sharp.js",
        `module.exports = require('./build/Release/sharp.node')`
      );
      return next();
    },
  ],
  resources: ["assets/**/*", "node_modules/sharp/**/*"],
  // Make sure native modules are included
  enableNodeCli: true,
  // Clean build
  clean: true,
  // Output configuration
  output: {
    name: "batch-paper",
  },
};
