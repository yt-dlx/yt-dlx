import { Request, Response } from "express";

export const getExample = (req: Request, res: Response) => {
  res.json({ message: "This is an example response from controller" });
};
