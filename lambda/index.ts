// const AWS = require("aws-sdk");
import { APIGatewayProxyEventV2, APIGatewayProxyResultV2, SQSHandler } from "aws-lambda";
// const dynamodb = new AWS.DynamoDB.DocumentClient();

export const handler: SQSHandler = async (event: any) => {
    console.log("EVENT ===>", event);
    const records = event.Records;
    console.log("RECORDS================>", records);
    try {
        // call a function which write data using writebatch or any other in dynamodb table
        console.log("Successfully try: ", records);
    } catch (error) {
        console.error("Error processing records:", error);
    }
};
