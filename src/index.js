import express from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import pokemonesRouter from "./routes/pokemones.js";

const app = express();
dotenv.config();
app.use(express.json());

const PORT = 3000;

app.get("/ping",validateToken, (_, res) => {
  console.log("someone pinged here!!");
  res.send("pong ");
});
app.post("/login", (req, res) => {
  const { username } = req.body;
  const user = { username };
  const accessToken = generateAcessToken(user);
  console.log("accessToken", accessToken);
  res.header("authorization", accessToken).json({
    message: "Usuario autenticado",
    token: accessToken,
  });
});
app.use("/api/pokemones",validateToken, pokemonesRouter);

function generateAcessToken(user) {
  return jwt.sign(user, process.env.SECRET, { expiresIn: "5m" });
}
function validateToken(req, res, next) {
  const accessToken = req.headers["authorization"];
  if (!accessToken) res.send("Access denied");
  jwt.verify(accessToken, process.env.SECRET, (err, user) => {
    if (err) {
      res.send("Access denied,token expired or incorrect");
    } else {
      next();
    }
  });
}
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
