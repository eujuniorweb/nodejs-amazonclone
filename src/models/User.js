const mongoose = require("mongoose");
const bcrypt = require("bcrypt-nodejs");
const crypto = require("crypto");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: { type: String, unique: true, lowercase: true },
  password: String,

  profile: {
    name: { type: String, default: "" },
    picture: { type: String, default: "" }
  },
  address: String,
  history: [
    {
      date: Date,
      paid: { type: Number, default: 0 }
      //   item:{type:Schema.Types.ObjectId, ref:''}
    }
  ]
});

UserSchema.pre("save", function(next) {
  let user = this;
  if (!user.isModified("password")) return next();
  bcrypt.genSalt(10, (error, salt) => {
    if (error) return next(error);
    bcrypt.hash(user.password, salt, null, (error, hash) => {
      if (error) return next(error);
      user.password = hash;
      next();
    });
  });
});

UserSchema.methods.comparePassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};

UserSchema.methods.gravatar = function(size) {
  if (!this.size) size = 200;
  if (!this.email) return "https://gravatar.com/avatar/?s" + size + "&d=retro";
  const md5 = crypto
    .createHash("md5")
    .update(this.email)
    .digest("hex");
  return "https://gravatar.com/avatar/" + md5 + "?s=" + size + "&d=retro";
};
module.exports = mongoose.model("User", UserSchema);
