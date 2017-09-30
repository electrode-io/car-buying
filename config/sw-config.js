module.exports = {
  cache: {
    cacheId: "car-buying",
    runtimeCaching: [{
      handler: "fastest",
      urlPattern: "\/$"
    }],
    staticFileGlobs: ['dist/**/*']
  },
  manifest: {
    background: "#FFFFFF",
    title: "car-buying",
    short_name: "PWA",
    theme_color: "#FFFFFF"
  }
};
