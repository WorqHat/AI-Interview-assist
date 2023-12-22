import { NextApiRequest, NextApiResponse } from "next";
import passport from "passport";
import nextConnect from "next-connect";
import middleware from "../../middlewares/middleware"; // Adjust the path accordingly

interface AuthInfo {
  message: string;
}

const handler = nextConnect<NextApiRequest, NextApiResponse>();

handler.use(middleware);

handler.post((req: NextApiRequest, res: NextApiResponse) => {
  passport.authenticate("local", (err, user, info: AuthInfo) => {
    if (err) return next(err);
    if (!user) return res.status(401).json({ message: info.message });
    req.logIn(user, (err) => {
      if (err) return next(err);
      return res.status(200).json({ message: "Login successful" });
    });
  })(req, res, next);
});

export default handler;
