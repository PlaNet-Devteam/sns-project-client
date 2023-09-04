import AWS from 'aws-sdk';
import dayjs from 'dayjs';
import { v1 } from 'uuid';

// S3 업로드 패키지 설치  aws-sdk
const ACCESS_KEY = process.env.NEXT_PUBLIC_AWS_ACCESS_KEY;
const SECRET_KEY = process.env.NEXT_PUBLIC_AWS_SECRET_KEY;
const REGION = 'ap-northeast-2';
const S3_BUCKET = process.env.NEXT_PUBLIC_AWS_S3_BUCKET_NAME as string;

AWS.config.update({
  accessKeyId: ACCESS_KEY,
  secretAccessKey: SECRET_KEY,
  region: REGION,
});
const s3 = new AWS.S3({
  useAccelerateEndpoint: false,
});

export const uploadFile = (
  file: File,
  cate: string,
): Promise<string | void> => {
  console.log('file', file);
  console.log(s3);
  const params: AWS.S3.PutObjectRequest = {
    ACL: 'public-read',
    Body: file,
    Bucket: S3_BUCKET as string,
    Key: `${cate}/${v1().toString().replace('-', '')}-${dayjs(
      new Date(),
    ).format('YY-MM-DD-h-m-s')}.${file.type.split('/')[1]}`,
  };

  const uploadToS3 = () => {
    return new Promise((resolve, reject) => {
      s3.upload(
        params,
        (err: AWS.AWSError | any, data: AWS.S3.ManagedUpload.SendData) => {
          if (err) {
            reject(err);
          } else {
            resolve(data.Location as string); // 업로드된 파일의 주소(URL)를 반환합니다.
          }
        },
      );
    });
  };

  return uploadToS3()
    .then((data) => {
      console.log('upload Image', data);
      return params.Key;
    })
    .catch((error) => {
      console.error(error);
    });
};
