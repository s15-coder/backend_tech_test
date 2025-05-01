require('dotenv').config();

import { serverStartUp } from "./config/server";
import { connectDB } from "./config/database";

connectDB().then(() => {
    serverStartUp();
});
