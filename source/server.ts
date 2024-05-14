import express from 'express';
import morgan from 'morgan';
import productRouter from "./routes/product";
import updateRouter from "./routes/update";
import updatePointRouter from "./routes/updatePoint";
import userRouter from "./routes/user";
import {protect} from "./modules/auth"
const app = express();

const secretMiddleware = (req, res, next)=>{
    req.secret_middleware = "secret message";
    next();
};

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(secretMiddleware);

app.use("/api", protect, [productRouter, updateRouter, updatePointRouter]);
app.use("/user", userRouter);
app.get("/", (req, res, next) => {
    res.status(200).json({message: "Welcome to the server!"});
});
app.use((err, req, res, next) => {
    if (err.type === "auth"){
        res.status(401).json({message: 'unauthorized'});
    } else if (err.type === "input"){
        res.status(400).json({message: 'invalid input'});
    } else {
        const error = JSON.stringify(err, Object.getOwnPropertyNames(err));
        res.status(500).json({error: error});
    }
});

export default  app;
