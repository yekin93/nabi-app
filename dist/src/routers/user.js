"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../../middleware/auth");
const user_1 = require("../controllers/user");
const router = (0, express_1.Router)();
router.get('/', auth_1.auth, user_1.UserController.getAll);
router.get('/:id', user_1.UserController.getById);
exports.default = router;
