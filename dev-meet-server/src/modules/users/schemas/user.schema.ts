import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

@Schema({timestamps: true}) // this will automatically add createdAt and updatedAt fields
export class User {
    // these @prop tells mongoose that this property is a field in the database and essential details about the field like type, uniqueness, etc.
    // and no need to use type in @prop as it automatically refer to the type of the property
    @Prop({ required: true, type: String })
    name: string;

    @Prop({ required: true, unique: true, type: String })
    email: string;

    @Prop({ required: true, type: String })
    password: string;

    @Prop({ required: true, type: String })
    role: string;

    @Prop({ type: String })
    age?: string;

    @Prop({ type: Date })
    dob?: string

}

export type UserDocument = HydratedDocument<User>;
export const UserSchema = SchemaFactory.createForClass(User);


// middleware for MONGODB
UserSchema.set('toJSON', {
  virtuals: false, // disables the virtuals including `id`
  transform: (_doc, record) => {

    // Format dob to "YYYY-MM-DD" remove the time part
     if (record.dob) {
      record.dob = new Date(record.dob).toISOString().split('T')[0];
    }

    // remove password and __v from the response
    delete record.password;
    delete record.__v;
    return record;
  },
});