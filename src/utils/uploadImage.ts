import AWS from 'aws-sdk';
import { v1 } from 'uuid';

// S3 업로드 패키지 설치  aws-sdk
const ACCESS_KEY = process.env.NEXT_PUBLIC_AWS_ACCESS_KEY;
const SECRET_KEY = process.env.NEXT_PUBLIC_AWS_SECRET_KEY;
const REGION = 'ap-northeast-2';
const S3_BUCKET = 'planet-image-bucket';

AWS.config.update({
  accessKeyId: ACCESS_KEY,
  secretAccessKey: SECRET_KEY,
});

const myBucket = new AWS.S3({
  params: { Bucket: S3_BUCKET },
  region: REGION,
});

export const uploadFile = (file: any) => {
  console.log('file', file);
  console.log(myBucket);
  const params = {
    ACL: 'public-read',
    Body: file,
    Bucket: S3_BUCKET,
    Key: `image/${v1().toString().replace('-', '')}.${file.type.split('/')[1]}`,
  };
  myBucket
    .putObject(params)
    .on('httpUploadProgress', (event) => {
      console.log(params.Key);
    })
    .send((err) => {
      if (err) console.log(err);
    });
};
