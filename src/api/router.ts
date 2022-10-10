import { Router } from "express";
import { router as s3Router } from './s3/api'

const router = Router();

router.use('/s3', s3Router)

export { router };