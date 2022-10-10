"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const _1 = require(".");
const router = (0, express_1.Router)();
exports.router = router;
const apiListS3Object = async (req, res) => {
    const request = await (0, _1.getAllS3Objs)();
    res.json(request);
};
const apiPostS3Object = async (req, res) => {
    console.log(req.body);
    const request = await (0, _1.uploadS3Obj)(req.body);
    res.json(request);
};
const apiGetS3Object = async (req, res) => {
    const request = await (0, _1.getS3Obj)(req.params.objectId);
    res.json(request);
};
const apiCopyS3Object = async (req, res) => {
    const request = await (0, _1.copyS3Obj)(req.params.objectId);
    res.json(request);
};
router.get('/:objectId', apiGetS3Object);
router.put('/:objectId', apiCopyS3Object);
router.get('/', apiListS3Object);
router.post('/', apiPostS3Object);
