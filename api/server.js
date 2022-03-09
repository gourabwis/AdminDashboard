const express = require("express");
const cors = require("cors");
const Product = require("./config");
const cookieParser = require("cookie-parser");
const serviceAccount = require("./config/serviceAccount.json");
const admin = require("./config/firebase.config");
const csrf = require("csurf");
const app = express();
app.use(express.json());
app.use(cors());
const csrfMiddleware = csrf({ cookie: true });
const port = process.env.PORT || 4000;
app.use(cookieParser());
app.use(csrfMiddleware);

app.all("*", (req, res, next) => {
  res.cookie("XSRF-TOKEN", req.csrfToken());
  next();
});


app.get("/", async (req, res) => {
  const sessionCookie = req.cookies.session || "";

  await admin
    .auth()
    .verifySessionCookie(sessionCookie, true /** checkRevoked */)
    .then((userData) => {
      console.log("Logged in:", userData.email)
  console.log(req.headers);
  const snapshot = Product.get();
  const list = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  res.send(list);
})
.catch((error) => {
  console.log("Error:", error);
});
});

app.post("/create", async (req, res) => {
  const data = req.body;
  await Product.add(data );
  res.send({ msg: "Product Added" });
});

app.post("/update", async (req, res) => {
  const id = req.body.id;
  delete req.body.id;
  const data = req.body;
  await Product.doc(id).update(data);
  res.send({ msg: "Updated" });
});

app.post("/delete", async (req, res) => {
  const id = req.body.id;
  await Product.doc(id).delete();
  res.send({ msg: "Deleted" });
});

app.post("/sessionLogin", (req, res) => {
  const idToken = req.body.idToken.toString();

  const expiresIn = 60 * 60 * 24 * 5 * 1000;

  admin
    .auth()
    .createSessionCookie(idToken, { expiresIn })
    .then(
      (sessionCookie) => {
        const options = { maxAge: expiresIn, httpOnly: true };
        res.cookie("session", sessionCookie, options);
        res.end(JSON.stringify({ status: "success" }));
      },
      (error) => {
        res.status(401).send("UNAUTHORIZED REQUEST!");
      }
    );
});

app.get("/login", function (req, res) {
  res.render("login.html");
});

app.get("/sessionLogout", (req, res) => {
  res.clearCookie("session");
  res.redirect("/login");
});

app.listen(port, () => console.log(`Server started on port ${port}`));