//Main Server
import express from 'express';
import connectDB from './config';
import dotenv from 'dotenv';
import cors from 'cors';
import userRoutes from './routes/userRoutes';
import optOutRoutes from './routes/optOutRoutes';
import monthlyRoutes from './routes/monthlyRoutes';


const app = express();
const PORT = process.env.PORT || 5000;

dotenv.config();
//connect to mongodb Atlas
connectDB();

app.use(express.json());
app.use(cors());


app.use('/api/users', userRoutes)
app.use('/api/optOut', optOutRoutes)
app.use('/api/monthly', monthlyRoutes)

// app.get("/", (req, res) => {
//     res.send("MongoDB Atlas connection successful.")
// })

app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`)
})

