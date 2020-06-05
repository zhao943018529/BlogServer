import { FileUpload } from 'graphql-upload';
import { Context } from 'koa';

export type Upload = FileUpload;

export interface GraphQLContext {
  ctx: Context;
  user: any;
  test: string;
}
