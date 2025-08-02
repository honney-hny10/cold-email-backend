import express, { Request, Response, NextFunction } from "express";
import { body, validationResult } from "express-validator";
import { createCampaign } from "../controllers/campaignController";

const router = express.Router();

router.post(
  "/",
  [
    body("name").notEmpty().withMessage("Campaign name is required"),
    body("emails").isArray({ min: 1 }).withMessage("Emails must be a non-empty array"),
    body("emails.*.recipientEmail")
      .isEmail()
      .withMessage("Each recipientEmail must be a valid email"),
  ],
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
  createCampaign
);

export default router;
