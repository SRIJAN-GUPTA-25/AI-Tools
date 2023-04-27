const express = require('express');
const colors = require('colors');
const morgan = require("morgan");
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const errorHandler = require('./middlewares/errorMiddleware');

////dotenv
dotenv.config()


////mongoDB Connection
connectDB();

/////object
const app = express();


///middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan('dev'));
app.use(errorHandler);



// app.get("/", (req, res) => {
//     res.send("Helloo..");
// })
const PORT = process.env.PORT || 8080;


//API routes
app.use('/api/v1/auth', authRoutes);
app.use("/api/v1/openai", require("./routes/openaiRoutes"));

app.listen(PORT, () => {
    console.log(`Server is running on the port no ${PORT}`.bgGreen.white);
})