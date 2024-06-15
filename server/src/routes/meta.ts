import express from "express";
import Agent from "../base/Agent";

var router: express.Router = express.Router();
function parseBoolean(value: any): boolean {
  switch (typeof value) {
    case "boolean":
      return value;
    case "string":
      return value.toLowerCase() === "true";
    default:
      return Boolean(value);
  }
}
router.get("/meta", async (req: express.Request, res: express.Response) => {
  try {
    var proc = await Agent({
      query: (req.query.query as string) || "",
      useTor: parseBoolean(req.query.useTor),
      verbose: parseBoolean(req.query.verbose),
    });
    if (proc) res.status(200).send(proc);
    else res.status(500).send({ message: "Invalid query" });
  } catch (error) {
    res.status(500).send(error);
  }
});
export default router;
