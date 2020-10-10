import AWS from 'aws-sdk';
import commomMiddleware from '../lib/commonMiddleware';
import createError from 'http-errors';
import validator from '@middy/validator';
import getAuctionsSchema from '../lib/schemas/getAuctionsSchema'

const dynamoDB = new AWS.DynamoDB.DocumentClient();

async function getAuctions(event, context) {
  const { status } = event.queryStringParameters;
  let auctions

  try {
    const result = await dynamoDB.query({
      TableName: process.env.AUCTIONS_TABLE_NAME,
      IndexName: 'statusAndEndDate',
      KeyConditionExpression: '#status = :status',
      ExpressionAttributeValues: {
        ':status': status,
      },
      ExpressionAttributeNames: {
        '#status': 'status',
      }
    }).promise()
    auctions = result.Items;
  } catch (error) {
    console.log(error)
    throw new createError.InternalServerError(error)
  }

  return {
    statusCode: 200,
    body: JSON.stringify({ auctions }),
  };
}

export const handler = commomMiddleware(getAuctions)
  .use(validator({ inputSchema: getAuctionsSchema, useDefaults: true }))

