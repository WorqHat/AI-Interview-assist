import { NextApiRequest, NextApiResponse } from "next";
// import cookie from "cookie";

export const ensureAuthenticated = (
  req: NextApiRequest,
  res: NextApiResponse | undefined,
  next: any
) => {
  try {
    const userCookie = req.cookies.user;
    const user = userCookie ? JSON.parse(userCookie) : null;
//Auth from user
    if (user) {
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
  } catch (parseErr) {
    if (res) {
      res.setHeader("Location", "/login");
      res.statusCode = 302; 
      res.end();
    } else {
      throw new Error("Response object is not defined");
    }
  }
};
