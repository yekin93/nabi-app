"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../middleware/auth");
const user_1 = require("../controllers/user");
const router = (0, express_1.Router)();
const userController = user_1.UserController.getInstance();
router.get('/', userController.getAll);
router.get('/:id', auth_1.auth, userController.getById);
exports.default = router;
