import cuid from "cuid"
import { config } from "../../config"
import { copyS3, downloadS3, listS3, uploadS3 } from "../../services/s3"

export const getS3Obj = async (objectId: string) => {
    const download = await downloadS3({ Bucket: config.S3_BUCKET, Key: objectId })
    if (download) {
        return download
    }
}

export const uploadS3Obj = async (body: any) => {
    const objectId = cuid()
    await uploadS3({ Bucket: config.S3_BUCKET, Key: objectId, Body: JSON.stringify(body) })
    return { objectId }
}

export const getAllS3Objs = async () => {
    const list = await listS3(config.S3_BUCKET)
    return list.Contents
}

export const copyS3Obj = async (objectId: string) => {
    const newObjectId = cuid()
    await copyS3(config.S3_BUCKET, objectId, newObjectId)
    return { objectId: newObjectId }
}