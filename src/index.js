const dotenv = require('dotenv');
dotenv.config();

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");


const { activeLogs } = require("./utils/config");
const { convertLocalDate } = require("./utils/utilities");
const { haveUpdate } = require("./controllers/iana");

const app = express();



const allOptions = {
    method: ["GET"],
    credentials: true,
    allowedHeaders: "X-Requested-With,content-type, resources",
    exposedHeaders: "resources",
    origin: "*",
};

app.use(helmet());
app.use('/health', cors(allOptions), (req, res) => {
    res.status = 200;
    res.json({ message: 'ok!' });
});

app.use('/haveUpdate', cors(allOptions), async (req, res) => {
    await haveUpdate();
    res.json({ message: 'ok!' });
});

app.set('port', process.env.PORT);
app.listen(app.get('port'), () => {
    if (activeLogs) {
        console.log('----------------------------------');
        console.log(`|           PORT ${app.get("port")}           |`);
        console.log(`|           SERVICE UP!!         |`);
        console.log(`| UP FROM :${convertLocalDate(null, "DD-MM-YYYY HH:mm:ss")} |`);
        console.log('----------------------------------');
    }
});

