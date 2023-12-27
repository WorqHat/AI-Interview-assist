// server.ts
import passport from "passport";
import passportLocal from "passport-local";
import { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
console.log("login.ts");
const LocalStrategy = passportLocal.Strategy;

// Mock user data (replace this with a database)
const users = [{ id: 1, username: "testuser", password: "password" }];
// Serialize and deserialize user
passport.serializeUser((user: any, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  const user = users.find((u) => u.id === id);
  done(null, user);
});

passport.use(
  new LocalStrategy(
    { usernameField: "username" },
    async (username, password, done) => {
      try {
        const user = users.find((u) => u.username === username.toLowerCase());
        if (!user) {
          return done(null, false, {
            message: `Username ${username} not found.`,
          });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
          return done(null, false, {
            message: "Invalid username or password.",
          });
        }

        return done(null, user);
      } catch (error) {
        return done(error);
      }
    },
  ),
);

// Authentication middleware

export const isAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (req.isAuthenticated()) {
    return next();
  }
  console.log("test");
  res.redirect("/login");
};

export function configurePassport() {
  return passport;
}
// https://github.com/microsoft/TypeScript-Node-Starter/blob/master/src/controllers/user.ts
