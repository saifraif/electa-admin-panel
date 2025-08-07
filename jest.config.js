module.exports = {
  transformIgnorePatterns: [
    // Add any packages that need to be transformed
    "node_modules/(?!axios)/",
  ],
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "babel-jest",
  },
};
