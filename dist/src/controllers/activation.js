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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActivationController = void 0;
const ActivationService_1 = require("../services/ActivationService");
class ActivationController {
}
exports.ActivationController = ActivationController;
_a = ActivationController;
ActivationController.activateUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.params.token;
    yield ActivationService_1.ActivationService.activateUser(token);
    res.status(200).json({
        status: true,
        message: 'User activated'
    });
});
