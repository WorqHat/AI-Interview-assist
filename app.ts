import express from "express";
import passport from "passport";
import LocalStrategy from "passport-local";
import session from "express-session";
import { configurePassport, isAuthenticated } from "./pages/api/login";
import authRouter from "./pages/api/auth";
console.log("app.ts");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: "clientpassportauthentication",
    resave: false,
    saveUninitialized: false,
  }),
);
app.use(passport.initialize());
app.use(passport.session());
// const passportInstance = configurePassport();
app.use("/auth", authRouter);

app.get("/interview", isAuthenticated, (req, res) => {
  res.send("You are authenticated!");
});
const passportInstance = configurePassport();
app.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/interview",
    failureRedirect: "/login",
  }),
);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
