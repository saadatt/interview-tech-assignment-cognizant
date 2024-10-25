import { Request, Response, RequestHandler } from "express";

export const asyncHandler = (
  fn: (req: Request, res: Response) => unknown,
): RequestHandler => {

  return (req: Request, res: Response) => {
    Promise.resolve(fn(req, res))
      .then((data: unknown) => {
        res.status(200).json(data);
      })
      .catch((error: any) => {
        res.status(error.statusCode).json({
          success: false,
          data: error.data,
          message: error.message,
        });
      });
  };
};