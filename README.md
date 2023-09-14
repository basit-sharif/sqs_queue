# Welcome to your CDK TypeScript project

This is a blank project for CDK development with TypeScript.

The `cdk.json` file tells the CDK Toolkit how to execute your app.

## Useful commands

* `npm run build`   compile typescript to js
* `npm run watch`   watch for changes and compile
* `npm run test`    perform the jest unit tests
* `cdk deploy`      deploy this stack to your default AWS account/region
* `cdk diff`        compare deployed stack with current state
* `cdk synth`       emits the synthesized CloudFormation template


call using local invoke
```
const AWS = require("aws-sdk");
import { SQSClient, SendMessageBatchCommand } from "@aws-sdk/client-sqs";
const client = new SQSClient();

AWS.config.update({
  region: "us-east-1",
});

const sendToSQS = async () => {
  const input :any= {
    QueueUrl: "https://sqs.us-east-1.amazonaws.com/965885276065/SqsQueueQueue",
    Entries: [
      {
        Id: "ddfasd", // required
        MessageBody: "STRING_VALUE", // required,
      },
    ],
  };
  
  const command = new SendMessageBatchCommand(input);
  const response = await client.send(command);
};

sendToSQS();
```