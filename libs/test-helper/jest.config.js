module.exports = {
    name: "test-helper",
    preset: "../../jest.config.js",
    coverageDirectory: "../../coverage/libs/test-helper",
    snapshotSerializers: [
        "jest-preset-angular/AngularSnapshotSerializer.js",
        "jest-preset-angular/HTMLCommentSerializer.js"
    ]
};
