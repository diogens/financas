const bycrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET;

async function signup(_, args, ctx, info) {
  const password = await bycrypt.hash(args.password, 10);
  const user = await ctx.db.mutation.createUser({
    data: { ...args, password }
  });

  const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: "2h" });
  console.log("Passs: ", password);
  return {
    token,
    user
  };
}

module.exports = {
  signup
};
