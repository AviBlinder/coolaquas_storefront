var aws = require('aws-sdk');
var ses = new aws.SES({ region: 'eu-west-1' });

exports.handler = async function (event, context) {
  console.log('lambda triggered by insert :', event);
  console.log('context: ', context);
  let senderMail = '';
  if (process.env.orderEmail) {
    senderMail = process.env.orderEmail;
    console.log('senderMail: ', senderMail);
  } else {
    throw 'missing orderEmail env. variable ';
  }

  let eventAction = '';

  event.Records.map((record) => {
    switch (record.eventName) {
      case 'REMOVE':
        eventAction = 'removed';
        break;
      case 'INSERT':
        eventAction = 'inserted';
        break;
      default:
        console.log('different eventName: ', record.eventName);
      // code
    }
    // process mail
    var params = {
      Destination: {
        // ToAddresses: ["operations@coolaquas.com","aviblinder@gmail.com"]
        ToAddresses: [senderMail],
      },
      Source: 'infra@coolaquas.com',
      Message: {
        Body: {
          Text: { Data: 'An order was ' + eventAction },
        },

        Subject: { Data: 'Coolaquas - Order Handle' },
      },
    };
    console.log('before send mail ', params);
    return ses.sendEmail(params).promise();
  });
};
