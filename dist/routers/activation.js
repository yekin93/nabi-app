"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const activation_1 = require("../controllers/activation");
const router = (0, express_1.Router)();
const activationController = activation_1.ActivationController.getInstance();
router.get('/:token', activationController.activateUser);
exports.default = router;
