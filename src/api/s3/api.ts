import { Request, Response, Router } from "express";
import { copyS3Obj, getAllS3Objs, getS3Obj, uploadS3Obj } from ".";

const router = Router();

const apiListS3Object = async (req: Request, res: Response) => {
    const request = await getAllS3Objs();
    res.json(request);
}

const apiPostS3Object = async (req: Request, res: Response) => {
    console.log(req.body)
    const request = await uploadS3Obj(req.body);
    res.json(request);
}

const apiGetS3Object = async (req: Request, res: Response) => {
    const request = await getS3Obj(req.params.objectId);
    res.json(request);
}

const apiCopyS3Object = async (req: Request, res: Response) => {
    const request = await copyS3Obj(req.params.objectId);
    res.json(request);
}

router.get('/:objectId', apiGetS3Object)
router.put('/:objectId', apiCopyS3Object)
router.get('/', apiListS3Object)
router.post('/', apiPostS3Object)


export { router }