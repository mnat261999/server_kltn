export default () => {
  return ({
    node_env: process.env.NODE_ENV || 'development',
    port: parseInt(process.env.PORT, 10) || 3000,
    mongoUrl: process.env.MONGODB_URL || 'mongodb+srv://lucy:Thu123456@cluster0.pgwdk.mongodb.net/social?retryWrites=true&w=majority',
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
    }
  })
};