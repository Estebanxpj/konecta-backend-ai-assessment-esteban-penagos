module.exports = {
    preset: "ts-jest",
    testEnvironment: "node",
    coverageDirectory: "coverage",
    coveragePathIgnorePatterns: [
      "./src/adapters/",
      "./src/infrastructure/",
      "./src/application/mocks/",
      "./src/application/shared/",
      "/dtos/",
    ],
    modulePathIgnorePatterns: [
      "./src/infrastructure/",
      "./src/adapters/",
      "./src/application/shared/",
    ],
  };
  