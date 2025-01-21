const express = require ("express")
const MainRouter = require('./routes')
const cors = require("cors")
const app = express();
app.use(express.json())
app.use(cors());

app.use("/api/v2",MainRouter)
app.listen(3000);