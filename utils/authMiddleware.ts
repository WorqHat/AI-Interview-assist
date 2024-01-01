// utils/authMiddleware.ts
import { NextApiRequest, NextApiResponse } from "next";
import passport from "passport";

export const authenticate = (
  req: NextApiRequest,
  res: NextApiResponse,
  next: any
) => {
  passport.authenticate(
    "local",
    (err: Error, user: any, info: any) => {
      if (err || !user) {
        return res.redirect("/login");
      }

      req.logIn(user, (loginErr) => {
        if (loginErr) {
          return res.redirect("/login");
        }

        return next();
      });
    }
  )(req, res, next);
};

export const ensureAuthenticated = (
  req: NextApiRequest,
  res: NextApiResponse,
  next: any
) => {
  if (req.isAuthenticated()) {
    return next();
  } else {
    return res.redirect("/login");
  }
};
