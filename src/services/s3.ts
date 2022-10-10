import {CopyObjectCommand, GetObjectCommand, GetObjectCommandInput, GetObjectCommandOutput, ListObjectsV2Command, ListObjectsV2CommandOutput, PutObjectCommand, PutObjectCommandInput, PutObjectCommandOutput, S3Client} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import axios from "axios";
import { streamToBuffer } from "../utils";

const s3 = new S3Client({ region: 'us-east-1' });

export const uploadS3 = async (params: PutObjectCommandInput): Promise<PutObjectCommandOutput> => {
  const { Body } = params
  console.log(params)
  //const bufferedBody = await streamToBuffer(Body as any)
  return await s3.send(new PutObjectCommand(params))
}

export const downloadS3 = async (params: GetObjectCommandInput) => {
  const url = await getSignedUrl(s3, new GetObjectCommand(params), { expiresIn: 40 * 60})
  const object = (await axios.get(url)).data
  return object
}

export const listS3 = async (bucket: string): Promise<ListObjectsV2CommandOutput> => {
  return await s3.send(new ListObjectsV2Command({ Bucket: bucket }))
}

export const copyS3 = async (bucket: string, sourceKey: string, destinationKey: string, metadata?: Record<string, string>) => {
  const response = await s3.send(
    new CopyObjectCommand({
      Bucket: bucket,
      CopySource: `${bucket}/${sourceKey}`,
      Key: destinationKey,
      Metadata: metadata,
      MetadataDirective: metadata ? "REPLACE" : "COPY",
    })
  );
  return response
}