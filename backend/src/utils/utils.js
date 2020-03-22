const jwt = require("jsonwebtoken");

function getUserId(context) {
  const Authorization = context.request.get("Authorization");
  if (Authorization) {
    const token = Authorization.replace("Bearer ", "");
    const { userId } = jwt.verify(token, process.env.JWT_SECRET);
    return userId;
  }

  console.log("caiu aqui");

  throw new Error("Não autenticado!");
}

module.exports = {
  getUserId
};
