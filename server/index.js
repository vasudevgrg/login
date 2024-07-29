const express= require("express");
const cors= require("cors");
const cookieParser = require("cookie-parser");
const { createServer } = require("http");

const {setupChat} = require("./libs/chat");
const userRoutes= require("./routes/user");
const sessionRoutes= require("./routes/session");

const app= express();
const httpServer = createServer(app);

app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());


app.use("/",userRoutes);
app.use("/session", sessionRoutes);

setupChat(httpServer);

httpServer.listen(5002,()=>console.log("listening to 5002"));
