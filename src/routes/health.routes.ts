import express from "express";

const router = express.Router();

router.get("/", (_req, res) => {
  res.status(200).json({
    status: "ok",
    service: "reliable-rag-agent",
  });
});

export default router;
