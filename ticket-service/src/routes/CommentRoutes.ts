import { Router } from "express";

//controllers
import { createComment } from "../controllers/CommentController.js";

//helpers
import { createCommentValidations } from "../helpers/comments-validations.js";
import { validate } from "../helpers/handle-validations.js";

const router = Router()

router.post("/api/ticket/:id/comments/create", createCommentValidations, validate, createComment)

export default router