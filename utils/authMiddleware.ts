import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";

export const ensureAuthenticated = (
  req: NextApiRequest,
  res: NextApiResponse | undefined,
  next: any,
) => {
  try {
    const token = req.cookies.token;
    // console.log("token", token);
    if (token) {
      const decodedToken = jwt.verify(
        token,
        "a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6",
      );
      // console.log("Authenticated User", decodedToken);
      return next();
    } else {
      if (res) {
        res.setHeader("Location", "/login");
        res.statusCode = 302;
        res.end();
      } else {
        throw new Error("Response object is not defined");
      }
    }
  } catch (verifyErr) {
    // console.log("Failed to verify token", verifyErr);
    if (res) {
      res.setHeader("Location", "/login");
      res.statusCode = 302;
      res.end();
    } else {
      throw new Error("Response object is not defined");
    }
  }
};
