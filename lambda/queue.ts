const AWS = require("aws-sdk");
import { SQSClient, SendMessageBatchCommand } from "@aws-sdk/client-sqs";
import { APIGatewayProxyEventV2 } from "aws-lambda";
const client = new SQSClient();

const sendToSQS = async () => {
    const input: any = {
        QueueUrl: "https://sqs.us-east-1.amazonaws.com/965885276065/SqsQueueQueue",
        Entries: [
            {
                Id: "ddfasd", // required
                MessageBody: "STRING_VALUE", // required,
            },
            {
                Id: "id2", // required
                MessageBody: "message2", // required,
            },
            {
                Id: "id3", // required
                MessageBody: "message2", // required,
            },
            {
                Id: "id34", // required
                MessageBody: "message3", // required,
            },
            {
                Id: "id35", // required
                MessageBody: "message4", // required,
            },
            {
                Id: "id36", // required
                MessageBody: "message5", // required,
            },
            {
                Id: "id37", // required
                MessageBody: "message6", // required,
            },
            {
                Id: "id38", // required
                MessageBody: "message7", // required,
            },
        ],
    };

    const command = new SendMessageBatchCommand(input);
    console.log("command =>", command);
    const response = await client.send(command);
    return response
};

export function handler(event: APIGatewayProxyEventV2) {

    try {
        console.log("event from overall queu ==>", event)
        return sendToSQS();
    } catch (err) {
        return {
            statusCode: 400,
            body: "Failed"
        }
    }
} 