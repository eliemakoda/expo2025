const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const adminRoutes = require("./src/routes/admin.router");
const BlogRouter = require("./src/routes/blogRoutes.route");
const eventRoutes = require("./src/routes/event.router");
const ContactRouter = require("./src/routes/contact.router");
const Admin = require("./src/model/admin.model");
const jwt = require("jsonwebtoken");
const path = require("path");
const { hashPassword, verifyPassword, validatePassword } = require("./utils");
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(
  cors({
    origin: "https://expo2025osakajapan.com",
  })
);

app.use(express.static(path.join(process.cwd() + "/src/assets")));

app.use("/api/admins", adminRoutes);

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await Admin.getAdminByEmail(email);

  if (!user) {
    return res
      .status(404)
      .send({ msg: "No user found with the specified email." });
  }

  const isPasswordVerified = await verifyPassword(password, user.adminPassword);
  if (isPasswordVerified) {
    const token = jwt.sign(
      { userId: user.id, email: user.AdminEmail, name: user.AdminName },
      "expo2025",
      { expiresIn: "24h" }
    );
    return res.status(200).send({
      token: token,
      admin: {
        userId: user.id,
        email: user.AdminEmail,
        name: user.AdminName,
      },
    });
  }

  return res.status(401).json({ msg: "Invalid password. Please try again." });
});

const authenticateJWT = (req, res, next) => {
  const token = req.headers["authorization"];

  if (!token) {
    return res.status(403).json({ msg: "Missing JWT token in your request." });
  }

  jwt.verify(token, "expo2025", (err, user) => {
    if (err) {
      return res.status(403).json({
        msg: "Cannot authenticate the token you provided.",
      });
    }
    req.user = user;
    next();
  });
};
// app.use(authenticateJWT);
app.use("/api/blogs", BlogRouter);
app.use("/api/events", eventRoutes);
app.use("/api/contacts", ContactRouter);
app.get("/*", (req, res) => {
  res.sendFile(path.join(path.join(process.cwd() + "/src/assets/build/index.html")));
});
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
