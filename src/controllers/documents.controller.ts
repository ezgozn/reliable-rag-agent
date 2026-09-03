import type { RequestHandler } from "express";
import { z } from "zod";

import {
  createDocument,
  getDocumentById,
} from "../services/document.service.js";

const createDocumentSchema = z.object({
  title: z.string().trim().min(1),
  content: z.string().trim().min(1),
});

export const createDocumentHandler: RequestHandler = (req, res, next) => {
  const result = createDocumentSchema.safeParse(req.body);

  if (!result.success) {
    const error = Object.assign(new Error("Invalid document payload"), {
      status: 400,
    });

    return next(error);
  }

  const { title, content } = result.data;

  const document = createDocument({ title, content });

  res.status(201).json(document);
};

export const getDocumentByIdHandler: RequestHandler = (req, res, next) => {
  const id = req.params.id;

  if (typeof id !== "string" || !id) {
    const error = Object.assign(new Error("Document id is required"), {
      status: 400,
    });

    return next(error);
  }

  const document = getDocumentById(id);

  if (!document) {
    const error = Object.assign(new Error("Document not found"), {
      status: 404,
    });

    return next(error);
  }

  res.status(200).json(document);
};
