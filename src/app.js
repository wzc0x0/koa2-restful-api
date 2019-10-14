const Koa = require("koa");
const KoaBody = require("koa-body");
const favicon = require("koa-favicon");
const app = new Koa();

const response = require("./middleware/response");
const routerError = require("./middleware/routerError");
const cors = require("./middleware/cors");
const utils = require("./utils/tools");

app.use(cors);
app.use(
    KoaBody({
        multipart: true,
        formidable: {
            maxFileSize: 2048 * 1024 * 1024,
            hash: "sha1"
        }
    })
);
app.use(favicon(__dirname + "/favicon.ico"));
app.use(response);
app.use(require("./routers/user").routes());
app.use(require("./routers/photo").routes());
app.use(require("./routers/login").routes());
app.use(routerError);

app.listen(3000, () => {
    console.log("http://" + utils.networkAddress + ":3000");
    console.log("ok!");
});
