import ErrorLogModel from 'models/error-log';

export default method => {
  return async (req, res) => {
    try {
      const response = await method(req);
      res.status(200).send(response);
    } catch (e) {
      try {
        const logObject = {
          title: 'Erro Router Helper',
          message: e.message || 'Erro inesperado',
          req: req.body,
          headers: req.headers,
          code: e.code || e.status || '',
          response: e.data,
          url: (e.config && e.config.url) || '',
        };

        const errorLog = new ErrorLogModel(logObject);

        errorLog.save();
      } catch (errorOnLog) {
        console.log('FALHA AO GRAVAR LOGO', errorOnLog);
      }

      res.status(e.code || e.status || 400).send({
        error: e.error,
        message: e.message || 'Erro inesperado',
      });
    }
  };
};
