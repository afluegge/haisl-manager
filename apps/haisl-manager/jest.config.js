module.exports = {
    name:                "haisl-manager",
    preset:              "../../jest.config.js",
    coverageDirectory:   "../../coverage/apps/haisl-manager",
    snapshotSerializers: [
        "jest-preset-angular/AngularSnapshotSerializer.js",
        "jest-preset-angular/HTMLCommentSerializer.js"
    ]
};
