import { config } from "./config";
import express from 'express';
import { router } from "./api/router";

const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.use(express.json());

app.use(router);
console.log(config.ENV)

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});