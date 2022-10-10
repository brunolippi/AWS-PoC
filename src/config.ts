import * as dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(process.cwd(), `.env${((process.env.NODE_ENV === 'test') ? '.test' : '')}`) });

export const config = {
    ENV: process.env.NODE_ENV || 'development',
    S3_BUCKET: process.env.S3_BUCKET || 'chum-bucket-aws',
}