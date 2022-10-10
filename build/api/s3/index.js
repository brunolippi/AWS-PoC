"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.copyS3Obj = exports.getAllS3Objs = exports.uploadS3Obj = exports.getS3Obj = void 0;
const cuid_1 = __importDefault(require("cuid"));
const config_1 = require("../../config");
const s3_1 = require("../../services/s3");
const getS3Obj = async (objectId) => {
    const download = await (0, s3_1.downloadS3)({ Bucket: config_1.config.S3_BUCKET, Key: objectId });
    if (download) {
        return download;
    }
};
exports.getS3Obj = getS3Obj;
const uploadS3Obj = async (body) => {
    const objectId = (0, cuid_1.default)();
    await (0, s3_1.uploadS3)({ Bucket: config_1.config.S3_BUCKET, Key: objectId, Body: JSON.stringify(body) });
    return { objectId };
};
exports.uploadS3Obj = uploadS3Obj;
const getAllS3Objs = async () => {
    const list = await (0, s3_1.listS3)(config_1.config.S3_BUCKET);
    return list.Contents;
};
exports.getAllS3Objs = getAllS3Objs;
const copyS3Obj = async (objectId) => {
    const newObjectId = (0, cuid_1.default)();
    await (0, s3_1.copyS3)(config_1.config.S3_BUCKET, objectId, newObjectId);
    return { objectId: newObjectId };
};
exports.copyS3Obj = copyS3Obj;
