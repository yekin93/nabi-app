import { Router } from "express";
import { ActivationController } from "../controllers/activation";
const router = Router();

const activationController: ActivationController = ActivationController.getInstance();

router.get('/:token', activationController.activateUser);

export default router;