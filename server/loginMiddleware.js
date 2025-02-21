const loginCredentialCheck = (req, res, next) => {
  if (req.query.userName === "" || req.query.userName === undefined) {
    return res.send({ error: "Please pass the userName" });
  }
  if (req.query.password === "" || req.query.password === undefined) {
    return res.send({ error: "Please pass the password" });
  }
  if (req.query.password != process.env.Password) {
    return res.send({ error: "Please enter the correct password" });
  }
  next();
};
module.exports = { loginCredentialCheck };
