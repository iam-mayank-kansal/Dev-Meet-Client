import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

@Schema()
export class User {
    // these @prop tells mongoose that this property is a field in the database and essential details about the field like type, uniqueness, etc.
    // and no need to use type in @prop as it automatically refer to the type of the property
    @Prop({ required: true , type: String })
    name: string;
    
    @Prop({ required: true, unique: true , type : String })
    email: string;
    
    @Prop({ required: true , type: String })
    password: string;
    
    @Prop({   type : String })
    age?: string;

    @Prop({ default: Date.now })
    createdAt: Date;
    
    @Prop({ default: Date.now })
    updatedAt: Date;
}

export type UserDocument = HydratedDocument<User>;
export const UserSchema = SchemaFactory.createForClass(User);