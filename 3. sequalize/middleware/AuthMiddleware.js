const jwt = require("jsonwebtoken");

module.exports = {
  validateToken: (req, res, next) => {
    const authorizationHeaader = req.headers.authorization;
    let result;
    if (authorizationHeaader) {
      const token = req.headers.authorization.split(" ")[1]; // Bearer <token>
      const options = {
        expiresIn: "1h",
      };
      try {
        // verify makes sure that the token hasn't expired and has been issued by us
        result = jwt.verify(token, "jsonwebkey", options);
        // pass back the decoded token to the request object
        req.params.userId = result.userId;
        // call next to pass execution to the subsequent middleware
        next();
      } catch (err) {
        // Throw an error just in case anything goes wrong with verification
        return res.status(401).send({ error: err.message });
      }
    } else {
      result = {
        error: `Authentication error. Token required.`,
        status: 401,
      };
      res.status(401).send(result);
    }
  },
};
