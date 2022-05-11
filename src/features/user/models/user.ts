import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Exclude, Transform } from 'class-transformer';
import mongoose from 'mongoose';
import { ROLE } from 'src/shared/constants';
 
export type UserDocument = User & Document;
 
@Schema({ timestamps: true })
export class User {

  @Prop({ 
    required: [true, "Please add your email"],
    unique: true,
    trim:true
  })
  email: string;

  @Prop({
    required:true,
    trim:true
  })
  fullname: string;

  @Prop({
    required:true,
    trim:true
  })
  username: string;

  @Prop({
    required:true,
    trim:true
  })
  @Exclude({ toPlainOnly: true }) // loại trừ thuộc tính
  password: string;

  @Prop({})
  avatar: [
    {
      user : { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      url : { type:string }
    }
  ]

  @Prop({})
  dob:Date

  @Prop({maxlength:100})
  bio: string

  @Prop({type: String, enum:ROLE,default:ROLE.USER})
  role:ROLE

  @Prop({})
  refresh_token :string
}
 
export const UserSchema = SchemaFactory.createForClass(User);