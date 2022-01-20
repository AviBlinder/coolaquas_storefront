var aws = require('aws-sdk');
var ses = new aws.SES({ region: 'eu-west-1' });

exports.handler = async function (event) {
  console.log('lambda triggered by insert :', event);
  // Mail Sender
  let senderMail = '';
  if (process.env.orderEmail) {
    senderMail = process.env.orderEmail;
    console.log('senderMail: ', senderMail);
  } else {
    throw 'missing orderEmail env. variable ';
  }

  //process records
  let eventAction = [];
  let eventDetails = [];
  let sendMail = false;

  event.Records.map((record) => {
    console.log('record = ', record);
    switch (record.eventName) {
      case 'REMOVE':
        eventAction = 'removed';
        eventDetails.push(record);
        sendMail = false;
        break;
      case 'INSERT':
        eventAction = 'inserted';
        sendMail = true;
        let orderDetails = {
          id: record.dynamodb.Keys.id.S,
          email: record.dynamodb.NewImage.email.S,
          owner: record.dynamodb.NewImage.owner.S,
          paypalOrderId: record.dynamodb.NewImage.paypalOrderId.S,
        };
        eventDetails.push(orderDetails);
        // eventDetails.push(record)

        break;
      default:
        console.log('different eventName: ', record.eventName);
    }
  });
  console.log('eventDetails: ', eventDetails);
  // mail parameters
  var params = {
    Destination: {
      ToAddresses: [senderMail],
    },
    Source: 'Orders@coolaquas.com',
    Message: {
      Body: {
        Text: {
          Data:
            'An order was ' +
            eventAction +
            '.Details :' +
            JSON.stringify(eventDetails),
        },
      },

      Subject: { Data: 'Coolaquas - Order Handle' },
    },
  };
  console.log('before send mail ', params);
  if (sendMail) {
    return ses.sendEmail(params).promise();
  } else {
    return;
  }
};

//Record Structcure:
record = {
  eventID: 'e36c89bb2f8c63da9eb8170b89f809d7',
  eventName: 'INSERT',
  eventVersion: '1.1',
  eventSource: 'aws:dynamodb',
  awsRegion: 'eu-west-1',
  dynamodb: {
    ApproximateCreationDateTime: 1642515637,
    Keys: { id: [Object] },
    NewImage: {
      owner: [Object],
      shippingCost: [Object],
      billingDetails: [Object],
      _lastChangedAt: [Object],
      __typename: [Object],
      shippingType: [Object],
      products: [Object],
      createdAt: [Object],
      total: [Object],
      shippingDetails: [Object],
      paypalOrderId: [Object],
      id: [Object],
      _version: [Object],
      email: [Object],
      status: [Object],
      updatedAt: [Object],
      username: [Object],
    },
    SequenceNumber: '107758200000000058664610242',
    SizeBytes: 688,
    StreamViewType: 'NEW_AND_OLD_IMAGES',
  },
  eventSourceARN:
    'arn:aws:dynamodb:eu-west-1:807594713240:table/Order-374rsnr5e5ayjcofjjgr55xnhu-dev/stream/2021-12-26T19:58:28.430',
};
