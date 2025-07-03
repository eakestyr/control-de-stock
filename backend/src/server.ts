import express from "express";
import cors from "cors";
import userRoutes from "./routes/user.routes";
import productRoutes from "./routes/product.routes";

const app = express();

app.use(cors());
app.use(express.json());

app.use(userRoutes);
app.use(productRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
