cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
  {
    "id": "cordova.custom.plugins.exitapp.exitApp",
    "file": "plugins/cordova.custom.plugins.exitapp/www/ExitApp.js",
    "pluginId": "cordova.custom.plugins.exitapp",
    "merges": [
      "navigator.app"
    ]
  },
  {
    "id": "cordova-plugin-statusbar.statusbar",
    "file": "plugins/cordova-plugin-statusbar/www/statusbar.js",
    "pluginId": "cordova-plugin-statusbar",
    "clobbers": [
      "window.StatusBar"
    ]
  }
];
module.exports.metadata = 
// TOP OF METADATA
{
  "cordova-plugin-whitelist": "1.3.3",
  "cordova.custom.plugins.exitapp": "1.0.0",
  "cordova-plugin-statusbar": "2.4.2"
};
// BOTTOM OF METADATA
});