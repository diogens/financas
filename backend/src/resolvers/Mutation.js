const bycrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const moment = require('moment')
const { getUserId } = require("./../utils/utils");

const JWT_SECRET = process.env.JWT_SECRET;

async function createRecord(_, args, ctx, info) {
  const date = moment(args.date)
  if(!date.isValid()){
    throw new Error('Data Invalida!')
  }
  const userId = getUserId(ctx);
  return ctx.db.mutation.createRecord(
    {
      data: {
        user: {
          connect: { id: userId }
        },
        account: {
          connect: { id: args.accountId }
        },
        category: {
          connect: { id: args.categoryId }
        },
        amount: args.amount,
        type: args.type,
        date: args.date,
        description: args.description,
        tags: args.tags,
        note: args.note
      }
    },
    info
  );
}

async function createCategory(_, { description, operation }, ctx, info) {
  const userId = getUserId(ctx);

  return ctx.db.mutation.createCategory(
    {
      data: {
        description,
        operation,
        user: {
          connect: {
            id: userId
          }
        }
      }
    },
    info
  );
}

function createAccount(_, { description }, ctx, info) {
  const userId = getUserId(ctx);
  return ctx.db.mutation.createAccount({
    data: {
      description,
      user: {
        connect: {
          id: userId
        }
      }
    }
  });
}

async function login(_, { email, password }, ctx, info) {
  const user = await ctx.db.query.user({ where: { email } });
  if (!user) {
    throw new Error("Email invalido ou não existe em nosso banco!");
  }

  const valid = await bycrypt.compare(password, user.password);
  if (!valid) {
    throw new Error("Senha errada");
  }

  const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: "2h" });
  console.log("Passs: ", password);
  return {
    token,
    user
  };
}

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
  login,
  signup,
  createAccount,
  createCategory,
  createRecord
};
