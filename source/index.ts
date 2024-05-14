import config from "./config";
import * as dotenv from 'dotenv';
dotenv.config();
import app from "./server";

app.listen(config.port, () => {
    console.log(`Listening on port: ${config.port}`);
});


