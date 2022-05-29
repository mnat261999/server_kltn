export default () => {
  return ({
    node_env: process.env.NODE_ENV || 'development',
    port: parseInt(process.env.PORT, 10) || 3000,
    mongoUrl: process.env.MONGODB_URL || 'mongodb+srv://lucy:Thu123456@cluster0.pgwdk.mongodb.net/tlcn?retryWrites=true&w=majority',
    jwt_serect: process.env.JWT_SECRECT,
    mail:{
      mailing_service_client_id: process.env.MAILING_SERVICE_CLIENT_ID,
      mailing_service_client_serect: process.env.MAILING_SERVICE_CLIENT_SERECT,
      mailing_service_refresh_token: process.env.MAILING_SERVICE_REFRESH_TOKEN,
      sender_email_address: process.env.SENDER_EMAIL_ADDRESS,
    },
    twilio:{
      twilio_account_sid: process.env.TWILIO_ACCOUNT_SID,
      twilio_auth_token: process.env.TWILIO_AUTH_TOKEN,
      twilio_phone_number: process.env.TWILIO_PHONE_NUMBER
    },
    aws:{
      aws_region: process.env.AWS_REGION,
      aws_access_key_id: process.env.AWS_ACCESS_KEY_ID,
      aws_secret_access_key: process.env.AWS_SECRET_ACCESS_KEY,
      aws_public_bucket_name: process.env.AWS_PUBLIC_BUCKET_NAME
    }
  })
};