import Model from 'models';
import AWS from 'aws-sdk';

export default class extends Model {
  async sendSms(phone, message) {
    try {
      await AWS.config.update({
        region: process.env.AWS_REGION,
      });

      const sns = await new AWS.SNS({ apiVersion: '2010-03-31' });

      const smsAttributes = {
        attributes: {
          DefaultSMSType: 'Transactional',
        },
      };

      await sns.setSMSAttributes(smsAttributes).promise();

      const message_params = {
        Message: message,
        PhoneNumber: phone,
      };

      const sendSms = await sns.publish(message_params).promise();

      return sendSms;
    } catch (e) {
      throw e;
    }
  }
}
