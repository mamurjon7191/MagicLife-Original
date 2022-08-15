const AppError = require("./../utilities/AppError");
const User = require("./../models/userModel");
const Code = require("./../models/codeModel");
const { catchErrorAsync } = require("./../utilities/catchError");
const Email = require("./../utilities/mail");
const jwt = require("jsonwebtoken");

const saveCookie = (req, res, token) => {
  res.cookie("code", token, {
    maxAge: process.env.CODE_COOKIE,
    httpOnly: true,
    secure: process.env.NODE_ENV == "DEVELOPMENT" ? false : true,
  });
};
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET_KEY, {
    expiresIn: 600,
  });
};

const sign_up = catchErrorAsync(async (req, res, next) => {
  let token;
  const randomCode = Math.round(Math.random() * 900000 + 100000);
  if (req.body.email) {
    const user = {
      email: req.body.email,
    };
    console.log(user);

    const hasEmail = await Code.findOne({
      email_or_phone: user.email,
    });

    if (hasEmail) {
      await Code.findByIdAndUpdate(hasEmail._id, {
        code: randomCode,
        expired_date: Number(Date.now()) + 600000,
      });
      token = createToken(hasEmail._id);
    } else {
      const newUser = await Code.create({
        email_or_phone: user.email,
        code: randomCode,
      });
      token = createToken(newUser._id);
    }
    await new Email(user, randomCode).sendCode();
  }

  req.email = req.body.email;

  saveCookie(req, res, token);

  res.status(200).json({
    status: "Succes",
    message: "Emailingizga kod jo'natildi",
  });

  next();
});

const verifyCode = catchErrorAsync(async (req, res, next) => {
  const getCode = await jwt.verify(
    req.cookies.code,
    process.env.JWT_SECRET_KEY
  );

  console.log(getCode);
  const user = await Code.findById(getCode.id);

  if (!user) {
    return next(new AppError("User has not defined", 400));
  }

  if (!(user.code == req.body.code && user.expired_date > Date.now())) {
    return next(
      new AppError("Your code is invalid or your code has expired date", 400)
    );
  }

  const data = await Code.findByIdAndUpdate(user.id, {
    verified: true,
  });

  user.verified = true;
  user.save();

  res.status(200).json({
    status: "success",
    message: "Email tasdiqlandi",
  });
});

module.exports = { sign_up, verifyCode };
