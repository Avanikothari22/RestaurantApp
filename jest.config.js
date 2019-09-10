module.exports = {
  verbose: true,
  collectCoverage: true,
  coverageDirectory: "./coverage",
  moduleDirectories: ["node_modules"],
  testPathIgnorePatterns: ["<rootDir>/__tests__/config/*", "<rootDir>/__tests__/mock/*"],
  transform: {
    ".(ts|tsx|js|jsx)": "ts-jest",
    ".+\\.(css|styl|less|sass|scss)$": "jest-transform-css"
},
  roots: ["<rootDir>"],
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.(t|j)sx?$",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx"],
  moduleNameMapper: {
        "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/fileTransformer.js",
      },
    
};