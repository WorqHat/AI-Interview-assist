// server.ts
import express from "express";
import session from "express-session";
import passport from "passport";
// import LocalStrategy from "passport-local";
import bcrypt from "bcrypt";
import { Strategy as LocalStrategy } from "passport-local";

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: false,
  }),
);
app.use(passport.initialize());
app.use(passport.session());

// Mock user for demonstration purposes
const users = [
  {
    id: "1",
    username: "testuser",
    password: "$2b$10$Lih1z...",
  },
];

passport.use(
  new LocalStrategy((username: string, password: string, done: any) => {
    const user = users.find((u) => u.username === username);

    if (!user) {
      return done(null, false, { message: "Incorrect username." });
    }

    if (!bcrypt.compareSync(password, user.password)) {
      return done(null, false, { message: "Incorrect password." });
    }

    return done(null, user);
  }),
);

passport.serializeUser((user: any, done) => {
  done(null, user.id);
});

passport.deserializeUser((id: string, done) => {
  const user = users.find((u) => u.id === id);
  done(null, user);
});

// Routes
app.post("/login", passport.authenticate("local"), (req, res) => {
  res.json(req.user);
});

app.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).send("Error logging out");
    }
    res.send("Logged out");
  });
});

app.get("/user", (req, res) => {
  res.json(req.user);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
