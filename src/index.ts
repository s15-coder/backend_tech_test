require('dotenv').config();

import app from "./config/app";
import { connectDB } from "./config/database";

connectDB().then(() => {
    const port = process.env.PORT || 3000;
    app.listen(port, () => {
        console.log(`Server is running on PORT: ${port}`);
    });

});
