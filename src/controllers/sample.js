import SampleModel from 'models/sample';

export const sampleMethod = async req => {
  const model = new SampleModel(req);
  return model.testMethod(req);
};
