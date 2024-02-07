
import mongoose from "mongoose";

const connectToMongoDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_DB_URI);
        console.log("Connnected to MDB");
    } catch (error) {
        console.log("error in connecting to mongoDB",error.message);
    }
};

export default  connectToMongoDB;