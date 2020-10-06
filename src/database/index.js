import mongoose from 'mongoose';

const connect = async () => {
  console.log('Connecting on:', process.env.MONGO_URL);
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });

    return {
      connected: true,
    };
  } catch (e) {
    return {
      connected: false,
      error: e,
    };
  }
};
mongoose.connection.on('connected', function() {
  console.log('Mongoose! Conectado em ' + process.env.MONGO_URL);
});

mongoose.connection.on('error', function(erro) {
  console.log('Mongoose! Erro na conexão: ' + erro);
});

process.on('SIGINT', () => {
  mongoose.connection.close(function() {
    console.log('Mongoose connection disconnected');
    process.exit(0);
  });
});

export default { connect };
