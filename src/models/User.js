const mongoose = require("mongoose");
const bcrypt = require("bcrypt-nodejs");
const Schema = mongoose.Schema;

// Atributos do Esquema de usuário, campos, caracteristicas
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
// Hash a senha antes de salvá-la no banco de dados
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

// comparar a senha no banco de dados com a senha que o usuário digitou
UserSchema.methods.comparePassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};
module.exports = mongoose.model("User", UserSchema);
