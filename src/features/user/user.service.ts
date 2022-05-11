import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './models/user';
import { Model } from 'mongoose';
import { RegisterDto } from './dtos/register.dto';
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';
import * as nodemailer from 'nodemailer'
import { ConfigService } from '@nestjs/config';
import { templateEmail } from 'src/shared/helpers/templateEmail';
import { LoginDto } from './dtos/login.dto';
const { google } = require('googleapis')


@Injectable()
export class UserService {
    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>,
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService
    ) {

    }

    async sendEmail(email: string, url: string, txt: string) {
        const { OAuth2 } = google.auth;
        const MAILING_SERVICE_CLIENT_ID = this.configService.get<string>("mail.mailing_service_client_id")
        const MAILING_SERVICE_CLIENT_SERECT = this.configService.get<string>("mail.mailing_service_client_serect")
        const MAILING_SERVICE_REFRESH_TOKEN = this.configService.get<string>("mail.mailing_service_refresh_token")
        const SENDER_EMAIL_ADDRESS = this.configService.get<string>("mail.sender_email_address")
        const OAUTH_PLAYGROUND = this.configService.get<string>("mail.oauth_playground")

        const oauth2Client = new OAuth2(
            MAILING_SERVICE_CLIENT_ID,
            MAILING_SERVICE_CLIENT_SERECT,
            MAILING_SERVICE_REFRESH_TOKEN,
            SENDER_EMAIL_ADDRESS,
            OAUTH_PLAYGROUND
        )
        oauth2Client.setCredentials({
            refresh_token: MAILING_SERVICE_REFRESH_TOKEN
        })

        const accessToken = oauth2Client.getAccessToken()
        process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
        const smtpTransport = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                type: 'OAuth2',
                user: SENDER_EMAIL_ADDRESS,
                clientId: MAILING_SERVICE_CLIENT_ID,
                clientSecret: MAILING_SERVICE_CLIENT_SERECT,
                refreshToken: MAILING_SERVICE_REFRESH_TOKEN,
                accessToken
            }
        })

        const mailOptions = templateEmail(SENDER_EMAIL_ADDRESS, email, txt, url)

        smtpTransport.sendMail(mailOptions, (err, infor) => {
            if (err) {
                console.log('Mail couldn\'t be sent because: ' + err);
            } else {
                console.log('Mail sent');
                return infor;
            }
        })
    }

    async register(body: RegisterDto): Promise<any> {
        try {
            const check = await this.userModel.findOne({ email: body.email })

            if (check) throw new HttpException('This account already exists', HttpStatus.BAD_REQUEST);

            const passwordHash = await bcrypt.hash(body.password, 12)

            body.password = passwordHash

            const activation_token = this.jwtService.sign(body,{ expiresIn: '120s',secret: process.env.JWT_SECRECT})


            const url = `http://localhost:3000/user/activate/${activation_token}`

            await this.sendEmail(body.email, url, "Verify your email address")

            throw new HttpException('Register Success! Please activate your email to start.', HttpStatus.CREATED)

        } catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST)
        }
    }

    async activationEmail(activation_token: string){
        try {

            const user = await this.jwtService.verify(activation_token, <any>process.env.JWT_SECRECT)

            const {email,fullname,username, password} = user

            const check = await this.userModel.findOne({ email: email })

            if (check) throw new HttpException('This account already exists', HttpStatus.BAD_REQUEST);

            const newUser = new this.userModel({
                email,fullname,username, password
            })

            await newUser.save() 
            
            throw new HttpException('Account has been activated!', HttpStatus.CREATED)
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST)
        }
    }

    async login(body: LoginDto){
        try {
            const user = await this.userModel.findOne({ email: body.email })

            if (!user) throw new HttpException('This account already exists', HttpStatus.BAD_REQUEST);
    
            const isMatch = await bcrypt.compare(body.password, user.password)
            if(!isMatch) throw new HttpException('Password is incorrect', HttpStatus.BAD_REQUEST);
    
            const refresh_token = this.jwtService.sign(body,{ expiresIn: '7d',secret: process.env.JWT_SECRECT})
    
            await this.userModel.findOneAndUpdate({_id: user._id}, {
                refresh_token: refresh_token
            })
            
            return null
            
        } catch (error) {
            console.log(error)
        }
    }
}
