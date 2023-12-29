// server.ts
import passport from "passport";
import passportLocal from "passport-local";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
console.log("login.ts");
const LocalStrategy = passportLocal.Strategy;

interface User {
  username: string;
  password: string;
  isSignUpMode: boolean;
}

export default async function handler(req: any, res: any) {
  const action = req.body.isSignUpMode;
  // console.log("loginStatus", action);
  if (action === false) {
    const data = await readData();
    const userData: User[] = data.data;
    handleLogin(req, res, userData);
  } else if (action === true) {
    handleSignup(req, res);
  } else {
    res.status(400).json({ message: "Invalid action." });
  }
}

function handleLogin(req: Request, res: Response, users: User[]) {
  console.log("request received", req.body);
  console.log("users", users);
  // const users = [{ id: 1, username: "testuser", password: "password" }];
  // Serialize and deserialize user
  passport.serializeUser((user: any, done) => {
    done(null, user);
  });

  passport.deserializeUser((user: any, done) => {
    // const user = users.find((u) => u.id === id);
    done(null, user);
  });

  passport.use(
    new LocalStrategy(
      { usernameField: "username" },
      async (username, password, done) => {
        try {
          // console.log("username", username);
          users.forEach((element) => {
            console.log("doc", element.username);
          });
          const user = users.find((u) => u.username == username);
          console.log("user", user);
          if (!user) {
            return done(null, false, {
              message: `Username ${username} not found.`,
            });
          }

          // const passwordMatch = await bcrypt.compare(password, user.password);
          console.log(`password:${typeof password}`);
          console.log(`userpassword:${typeof user.password}`);
          const passwordMatch = password == user.password ? true : false;
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
  passport.authenticate("local", (err: Error, userData: any, options: any) => {
    handleAuthenticationResult(err, userData, options, res);
  })(req, res);
}

async function handleSignup(req: Request, res: Response) {
  const users = [{ id: 1, username: "testuser", password: "password" }];

  passport.use(
    "signup",
    new LocalStrategy(
      { usernameField: "username" },
      async (username, password, done) => {
        try {
          const existingUser = users.find(
            (u) => u.username === username.toLowerCase(),
          );

          if (existingUser) {
            return done(null, false, {
              message: `Username ${username} is already taken.`,
            });
          }
          const hashedPassword = await bcrypt.hash(password, 10);
          const newUser = {
            id: users.length + 1,
            username,
            password: hashedPassword,
          };
          console.log("new user", newUser);
          // For simplicity, storing password in plain text (You should use bcrypt to hash passwords in a real application)
          // const newUser = { id: users.length + 1, username, password };
          users.push(newUser);

          return done(null, newUser);
        } catch (error) {
          return done(error);
        }
      },
    ),
  );

  passport.authenticate("signup", (err: Error, userData: any, options: any) => {
    handleAuthenticationResult(err, userData, options, res);
    storeUser(req);
  })(req, res);
}

function handleAuthenticationResult(
  err: Error | null,
  userData: any,
  options: any,
  res: Response,
) {
  let message;
  if (!userData) {
    console.log("Authentication failed", options.message);
    message = options.message;
    res.status(401).json({ message });
  } else {
    console.log("Authentication success");
    message = "Success";
    res.status(200).json({ userData });
  }
}

async function storeUser(req: any) {
  const userData = req.body;
  console.log("userdata", userData);
  var dbApiBody = JSON.stringify({
    collection: "Candidates",
    data: userData,
  });

  console.log("userdata", dbApiBody);

  const options = {
    method: "POST",
    headers: {
      Authorization: "Bearer sk-48478981d5464a4e8e8389f873b0bb73",
      "Content-Type": "application/json",
    },
    body: dbApiBody,
  };
  console.log("between request and data", userData);
  const Response = await fetch(
    "https://api.worqhat.com/api/collections/data/add",
    options,
  );
  const respdata = await Response.json();
  console.log("after request and data", respdata);
}
async function readData() {
  var dbApiBody = JSON.stringify({
    collection: "Candidates",
  });

  const options = {
    method: "POST",
    headers: {
      Authorization: "Bearer sk-48478981d5464a4e8e8389f873b0bb73",
      "Content-Type": "application/json",
    },
    body: dbApiBody,
  };
  const Response = await fetch(
    "https://api.worqhat.com/api/collections/data/fetch/all",
    options,
  );
  const respdata = await Response.json();
  // console.log("after request and data", respdata.data);
  const userData = respdata.data;
  return userData;
}

//   passport.authenticate("local", (err: Error, userData: any, options: any) => {
//     let message;
//     if (!userData) {
//       console.log("Login failed", options.message);
//       message = options.message;
//       res.status(401).json({ message });
//     } else {
//       console.log("Login success");
//       message = "Success";
//       res.status(200).json({ userData });
//     }
//     return message;
//   })(req, res);
// }
// https://github.com/microsoft/TypeScript-Node-Starter/blob/master/src/controllers/user.ts
