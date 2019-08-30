module.exports = {
    name: "frontend-angular-security",
    preset: "../../../jest.config.js",
    coverageDirectory: "../../../coverage/libs/frontend/angular-security",
    snapshotSerializers: [
        "jest-preset-angular/AngularSnapshotSerializer.js",
        "jest-preset-angular/HTMLCommentSerializer.js"
    ]
};
