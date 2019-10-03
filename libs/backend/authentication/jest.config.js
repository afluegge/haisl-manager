module.exports = {
    name: "backend-authentication",
    preset: "../../../jest.config.js",
    coverageDirectory: "../../../coverage/libs/backend/authentication",
    snapshotSerializers: [
        "jest-preset-angular/AngularSnapshotSerializer.js",
        "jest-preset-angular/HTMLCommentSerializer.js"
    ]
};
