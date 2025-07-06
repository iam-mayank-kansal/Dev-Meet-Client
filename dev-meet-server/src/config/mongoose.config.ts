import { MongooseModule } from "@nestjs/mongoose";
import { set } from "mongoose";
import { Logger } from "src/lib/loaders/logger.loader";

const logger = new Logger(); // create an instance

// enable Global getters(including virtuals) for mongoose
set('toJSON', { getters: true });
set('toObject', { getters: true });

// This module exports a MongooseModule that connects to MongoDB using an environment variable for the URI.
// It uses the `forRootAsync` method to allow for asynchronous configuration, which is useful
export default MongooseModule.forRootAsync({

    useFactory: async () => {
        const mongoUri = process.env.MONGO_URI;
        if (!mongoUri) {
            throw new Error("MONGO_URI is not defined in the environment variables");
        }
        logger.log(`Connecting to MongoDB at ${mongoUri}`); // Log the MongoDB URI for debugging
        // Return the MongoDB URI to be used by Mongoose
        return { uri: mongoUri };
    },

})