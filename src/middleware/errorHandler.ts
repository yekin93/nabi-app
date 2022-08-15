import { ErrorRequestHandler, Request, Response, NextFunction } from "express";
import log from '../utils/logger';


export const errorHandler = (err: ErrorRequestHandler, req: Request, res: Response, next: NextFunction) => {
    log.error(err);
    res.status(500).json({
        status: false,
        message: "Opps! something went wrong..."
    });
}