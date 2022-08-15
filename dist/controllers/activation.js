"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActivationController = void 0;
const ActivationService_1 = require("../services/ActivationService");
class ActivationController {
    constructor() {
        this.activateUser = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const token = req.params.token;
            yield this.activationService.activateUser(token);
            res.status(200).json({
                status: true,
                message: 'User activated'
            });
        });
        this.activationService = ActivationService_1.ActivationService.getInstance();
    }
    static getInstance() {
        if (!this.instance) {
            this.instance = new ActivationController();
        }
        return this.instance;
    }
}
exports.ActivationController = ActivationController;
