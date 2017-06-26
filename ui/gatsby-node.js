/**
 * Created by danielhollcraft on 6/21/17.
 */
exports.modifyWebpackConfig = function(config, stage) {

  // Workaround to get canvas to build with with webpack
  if(stage === "build-html") {
    config._config.externals ='canvas';
  }

  return config
};