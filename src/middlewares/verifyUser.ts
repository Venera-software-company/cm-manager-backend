import jwt from "jsonwebtoken";
import { JwtPayload } from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
// import Session from "../models/Session";

import 'dotenv/config';

export default (req: Request, res: Response, next: NextFunction) => {
  return next();
};