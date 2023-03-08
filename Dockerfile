FROM public.ecr.aws/lambda/nodejs:16

COPY . .


RUN npm install
RUN npm run build

ENV NODE_ENV='production'
ENV AWS_REGION=''
ENV AWS_ACCESS_KEY_ID=''
ENV AWS_SECRET_ACCESS_KEY=''
ENV mailUser=''
ENV mailPassword=''
ENV DB_HOST=''
ENV DB_PORT=''
ENV DB_USERNAME=''
ENV DB_PASSWORD=''
ENV DB_DATABASE_NAME=''

CMD ["dist/lambda.handler"]
