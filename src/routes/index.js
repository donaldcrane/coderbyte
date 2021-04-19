import { Router } from "express";
import userRoutes from "./userRoutes";
import postRoutes from "./postRoutes";

const router = new Router();

router.use("/", userRoutes);
router.use("/", postRoutes);

export default router;
