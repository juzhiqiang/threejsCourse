import { defineConfig } from "umi";

export default defineConfig({
  npmClient: "pnpm",
  chainWebpack(config) {
    const GLSL_REG = /\.(glsl|vs|fs)$/;

    config.module.rule("asset").exclude.add(GLSL_REG).end();

    config.module
      .rule("glslify")
      .test(GLSL_REG)
      .exclude.add(/node_modules/)
      .end()
      .use("raw-loader")
      .loader("raw-loader")
      .end();
  },
  proxy: {
    "/api": {
      target: "http://api.cpengx.cn",
      changeOrigin: true,
      pathRewrite: { "^/api": "" },
    },
  },
});
