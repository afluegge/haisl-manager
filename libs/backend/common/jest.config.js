module.exports = {
    name: "backend-common",
    preset: "../../../jest.config.js",
    coverageDirectory: "../../../coverage/libs/backend/common",
    snapshotSerializers: [
        "jest-preset-angular/AngularSnapshotSerializer.js",
        "jest-preset-angular/HTMLCommentSerializer.js"
    ]
};
