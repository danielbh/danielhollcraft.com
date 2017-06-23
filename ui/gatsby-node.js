/**
 * Created by danielhollcraft on 6/21/17.
 */
exports.modifyWebpackConfig = function(config, stage) {
    // edit loaders here
  if(stage === 'build-html') {
    // config.externals = 'canvas';
  }
  return config
};