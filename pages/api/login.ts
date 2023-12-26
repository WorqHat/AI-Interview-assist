// server.ts
import passport from "passport";
import passportLocal from "passport-local";
// import { User, UserType } from '../models/User';
import { Request, Response, NextFunction } from "express";
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

// // Passport local strategy
// passport.use(
//   new LocalStrategy({ usernameField: "email" }, (email, password, done) => {
//     users.findOne(
//       { email: email.toLowerCase() },
//       (err: any, user: Document) => {
//         if (err) {
//           return done(err);
//         }
//         if (!user) {
//           return done(undefined, false, {
//             message: `Email ${email} not found.`,
//           });
//         }
//         user.comparePassword(password, (err: Error, isMatch: boolean) => {
//           if (err) {
//             return done(err);
//           }
//           if (isMatch) {
//             return done(undefined, user);
//           }
//           return done(undefined, false, {
//             message: "Invalid email or password.",
//           });
//         });
//       },
//     );
//   }),
// );
passport.use(
  new LocalStrategy({ usernameField: "email" }, (email, password, done) => {
    const user = users.find((u) => u.username === email.toLowerCase());
    if (!user) {
      return done(undefined, false, { message: `Email ${email} not found.` });
    }

    if (user.password !== password) {
      return done(undefined, false, { message: "Invalid email or password." });
    }

    return done(undefined, user);
  }),
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
  res.redirect("/login");
};

// https://github.com/microsoft/TypeScript-Node-Starter/blob/master/src/controllers/user.ts
