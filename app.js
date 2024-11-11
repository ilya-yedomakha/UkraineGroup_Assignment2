const express =  require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const app = express();

dotenv.config();

const url = `mongodb://${process.env.MONGO_DB_HOSTNAME}:${process.env.MONGO_DB_PORT}/${process.env.MONGO_DB}`;

const salesmanRoutes = require("./api/routes/salesman.routes")
const socialPerformanceRecordsRoutes = require("./api/routes/social_performance_records.routes")

mongoose.connect(url)
    .then(()=>{
        console.log("Successful database connection")
    })
    .catch((error) => {
    console.error("Database connection failed:", error);
    });


app.get("/", (req, res) => {
    res.send("Hello from homepage");
})

app.use(express.json());
app.use("/salesman", salesmanRoutes)
app.use("/social_performance_record", socialPerformanceRecordsRoutes)

app.listen(process.env.PORT, () => {
    console.log(`[SERVER] ExpressJS is listening to port http://localhost:${process.env.PORT}`);
})