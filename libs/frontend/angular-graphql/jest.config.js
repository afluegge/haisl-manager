module.exports = {
    name:                "angular-graphql",
    preset:              "../../jest.config.js",
    coverageDirectory:   "../../coverage/libs/angular-graphql",
    snapshotSerializers: [
        "jest-preset-angular/AngularSnapshotSerializer.js",
        "jest-preset-angular/HTMLCommentSerializer.js"
    ],
    // just add this line
    setupFilesAfterEnv:  ["<rootDir>/src/test-setup.ts"]
};
