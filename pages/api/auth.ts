import express, { Request, Response } from "express";
import { isAuthenticated } from "./login";
import passport from "passport";
console.log("auth.ts");
const authRouter = express.Router();

// Login route
// auth.ts
authRouter.post("/login", (req: Request, res: Response) => {
  passport.authenticate("local", (err: Error, user: any, options: any) => {
    if (!user) {
      return res.status(401).json({ error: options.message });
    }

    // Successful authentication
    res.status(200).json({ message: "Login successful" });
  })(req, res);
});

// Logout route
authRouter.get("/logout", (req: Request, res: Response) => {
  //   req.logout(); // Passport method to log the user out
  res.redirect("/login");
});

// Protected route
authRouter.get("/interview", isAuthenticated, (req: Request, res: Response) => {
  res.send("You are authenticated!");
});

export default authRouter;
