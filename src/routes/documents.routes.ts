import express from "express";
import {
  createDocumentHandler,
  getDocumentByIdHandler,
} from "../controllers/documents.controller.js";

const router = express.Router();

router.post("/", createDocumentHandler);
router.get("/:id", getDocumentByIdHandler);

export default router;
