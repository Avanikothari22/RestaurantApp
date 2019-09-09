module.exports = {
    preset: 'react',
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  //   "transformIgnorePatterns": [
  //     "/node_modules/(?!react-native|native-base|react-native-cookies)/",
  //     "node_modules/(?!(jest-)?react-native)"
  //   ],
    "moduleNameMapper":{
      "\\.(css|less|sass|scss)$": "./__mocks__/styleMock.js",
  //     "\\.(jpg|ico|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "Users/anjali.rughani/Desktop/ICON/icon_repo/__mocks__/fileMock.js",
    },
  "collectCoverage": true,
  "moduleDirectories": [
  "node_modules",
  "src"
  ],
  // "transform": {
  // "^.+\\.js$": "./node_modules/react-native/jest/preprocessor.js"
  // },
  "coveragePathIgnorePatterns": [
  "/node_modules/",
  "/jest"
  ]
  }
  
  