import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as sqs from 'aws-cdk-lib/aws-sqs';
import * as lambda from "aws-cdk-lib/aws-lambda"
import { SqsEventSource } from 'aws-cdk-lib/aws-lambda-event-sources';
import * as apigwv2 from '@aws-cdk/aws-apigatewayv2-alpha'
import * as apigw_integrationv2 from "@aws-cdk/aws-apigatewayv2-integrations-alpha"
import * as dynamodb from "aws-cdk-lib/aws-dynamodb"

export class SqsQueueStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // const squeueTable = new dynamodb.Table(this, "squeueTable", {
    //   tableName: "squeueTable",
    //   partitionKey: {
    //     name: "query",
    //     type: dynamodb.AttributeType.STRING
    //   },
    // });

    let sqsLambda = new lambda.Function(this, "sqsLambda", {
      runtime: lambda.Runtime.NODEJS_16_X,
      code: lambda.Code.fromAsset("lambda"),
      handler: "post.handler",
    });
    let sqsTriggerLambda = new lambda.Function(this, "sqsTriggerLambda", {
      runtime: lambda.Runtime.NODEJS_16_X,
      code: lambda.Code.fromAsset("lambda"),
      handler: "queue.handler",
    });
    // example resource
    let deadLatterQueue = new sqs.Queue(this, 'deadLatterQueue', {
      queueName: "deadLatterQueue",
    });
    const queue = new sqs.Queue(this, 'SqsQueueQueue', {  
      queueName: "SqsQueueQueue",
      deadLetterQueue: {
        maxReceiveCount: 3,
        queue: deadLatterQueue,
      },
    });
    let eventSource = new SqsEventSource(queue);
    sqsLambda.addEventSource(eventSource);


    let HttpApi = new apigwv2.HttpApi(this, "sqsapi", {
      apiName: "sqsapi",
      corsPreflight: {
        allowHeaders: ["Content-Type"],
        allowMethods: [
          apigwv2.CorsHttpMethod.POST,
          apigwv2.CorsHttpMethod.PUT,
          apigwv2.CorsHttpMethod.DELETE,
        ],
        allowCredentials: false,
        allowOrigins: ["*"],
      }
    });

    let apigw_integrationLambda = new apigw_integrationv2.HttpLambdaIntegration("apigw_integration1", sqsTriggerLambda);

    HttpApi.addRoutes({
      path: "/caller",
      methods: [apigwv2.HttpMethod.POST],
      integration: apigw_integrationLambda
    });
    // squeueTable.grantFullAccess(sqsLambda);
  }
}
