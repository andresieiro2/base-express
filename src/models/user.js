import mongoose from 'mongoose';
import bcrypt from 'bcrypt-nodejs';

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    senha: { type: String },
    data_aceite: { type: Date },
    bairro: { type: String },
    celular: { type: String, required: true, unique: true },
    cep: { type: String },
    cidade: { type: String },
    cnpj: { type: String, unique: true },
    codigo_dealer: { type: String },
    cpf: { type: String, unique: true },
    //  ddd: { type: String },
    email_gc: { type: String },
    endereco: { type: String },
    funcao: { type: String },
    'funcao-vivo': { type: String },
    nome: { type: String, required: true },
    nome_fantasia: { type: String },
    nome_gc: { type: String },
    razao_social: { type: String },
    rede: { type: String },
    regional: { type: String },
    // territorio: { type: String },
    uf: { type: String },
    smsToken: { type: String },
    celular_verificado: { type: Boolean, default: false },
  },
  { timestamps: true }
);

userSchema.pre('save', function(next) {
  this.cpf ? (this.cpf = this.cpf.replace(/[^0-9]+/g, '')) : '';
  this.celular ? (this.celular = this.celular.replace(/[^0-9]+/g, '')) : '';
  this.cnpj ? (this.cnpj = this.cnpj.replace(/[^0-9]+/g, '')) : '';
  this.cep ? (this.cep = this.cep.replace(/[^0-9]+/g, '')) : '';

  if (
    this.celular &&
    this.ddd &&
    this.celular.length !== 11 &&
    (this.celular.length === 9 || this.celular.length === 8)
  ) {
    this.celular = `${this.ddd}${this.celular}`;
  }

  delete this.ddd;

  if (this.isModified('senha')) {
    bcrypt.genSalt(10, (err, salt) => {
      if (err) {
        return next(err);
      }
      bcrypt.hash(this.senha, salt, null, (err, hash) => {
        if (err) {
          return next(err);
        }
        this.senha = hash;
      });
    });
  }

  next();
});

// Compara senha inserida e senha da base
userSchema.methods.comparePassword = async function(password, selfPass, cb) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, selfPass, (err, isMatch) => {
      console.log({ err });
      if (err) resolve(false);
      resolve(isMatch);
    });
  });
};

export default mongoose.model('User', userSchema);
