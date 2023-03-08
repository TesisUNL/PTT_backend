import { configure as serverlessExpress } from '@vendia/serverless-express';
import { getApp } from './main';

import { Callback, Context, Handler } from 'aws-lambda';

let server: Handler;

const getExpressApp = async (): Promise<any> => {
  const app = await getApp();
  await app.init();

  const expressApp = app.getHttpAdapter().getInstance();
  return serverlessExpress({ app: expressApp });
};

export const handler: Handler = async (event: any, context: Context, callback: Callback) => {
  server = server ?? (await getExpressApp());
  console.log(event);
  return server(event, context, callback);
};
