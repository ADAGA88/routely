const path = require("node:path");
const { getDefaultConfig } = require("expo/metro-config");

const config = getDefaultConfig(__dirname);

if (process.env.EXPO_NO_METRO_WORKSPACE_ROOT === "1") {
  config.watchFolders = [...(config.watchFolders || []), path.resolve(__dirname, "../..")];
}

module.exports = config;
