"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.copyS3 = exports.listS3 = exports.downloadS3 = exports.uploadS3 = void 0;
const client_s3_1 = require("@aws-sdk/client-s3");
const s3_request_presigner_1 = require("@aws-sdk/s3-request-presigner");
const axios_1 = __importDefault(require("axios"));
const s3 = new client_s3_1.S3Client({ region: 'us-east-1' });
const uploadS3 = async (params) => {
    const { Body } = params;
    console.log(params);
    //const bufferedBody = await streamToBuffer(Body as any)
    return await s3.send(new client_s3_1.PutObjectCommand(params));
};
exports.uploadS3 = uploadS3;
const downloadS3 = async (params) => {
    const url = await (0, s3_request_presigner_1.getSignedUrl)(s3, new client_s3_1.GetObjectCommand(params), { expiresIn: 40 * 60 });
    const object = (await axios_1.default.get(url)).data;
    return object;
};
exports.downloadS3 = downloadS3;
const listS3 = async (bucket) => {
    return await s3.send(new client_s3_1.ListObjectsV2Command({ Bucket: bucket }));
};
exports.listS3 = listS3;
const copyS3 = async (bucket, sourceKey, destinationKey, metadata) => {
    const response = await s3.send(new client_s3_1.CopyObjectCommand({
        Bucket: bucket,
        CopySource: `${bucket}/${sourceKey}`,
        Key: destinationKey,
        Metadata: metadata,
        MetadataDirective: metadata ? "REPLACE" : "COPY",
    }));
    return response;
};
exports.copyS3 = copyS3;
