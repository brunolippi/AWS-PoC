"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("./config");
const express_1 = __importDefault(require("express"));
const router_1 = require("./api/router");
const app = (0, express_1.default)();
const port = 3000;
app.get('/', (req, res) => {
    res.send('Hello World!');
});
app.use(express_1.default.json());
app.use(router_1.router);
console.log(config_1.config.ENV);
app.listen(port, () => {
    return console.log(`Express is listening at http://localhost:${port}`);
});
