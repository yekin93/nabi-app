import { Request } from "express";
import { User } from "../models/User";

export interface IRequest extends Request {
    user: User;
}