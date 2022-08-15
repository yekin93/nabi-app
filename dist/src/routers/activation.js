"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const activation_1 = require("../controllers/activation");
const router = (0, express_1.Router)();
router.get('/:token', activation_1.ActivationController.activateUser);
exports.default = router;
