import mongoose from "mongoose";

let isConnected = false;

export const connectToDB = async () => {
    mongoose.set('strictQuery', true);

    if(isConnected) {
        console.log("Mongo Connected");
        return;
    }

    try {
        console.log("Connecting...");
        await mongoose.connect(process.env.MONGODB_URI, {
            dbName: 'share_prompt',
            // useNewUrlParser: true,
            // useUnifiedTopology: true,
        });

        isConnected = true;
        console.log("Mongo Connected");
    } catch (err) {
        console.log(err);
    }
}