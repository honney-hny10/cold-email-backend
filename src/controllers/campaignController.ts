import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Campaign } from "../entities/Campaign";
import { EmailJob } from "../entities/EmailJob";

// rest of your controller code ...


export const createCampaign = async (req: Request, res: Response) => {
  const { name, emails } = req.body;
  console.log("Received campaign data:", req.body);  // <-- log incoming JSON

  if (!name || !Array.isArray(emails) || emails.length === 0) {
    console.log("Invalid input");
    return res.status(400).json({ message: "Invalid input" });
  }

  const campaignRepo = AppDataSource.getRepository(Campaign);
  const emailRepo = AppDataSource.getRepository(EmailJob);

  try {
    const campaign = campaignRepo.create({ name });
    await campaignRepo.save(campaign);
    console.log("Saved campaign:", campaign);

    for (const e of emails) {
      if (!e.recipientEmail) continue;
      const emailJob = emailRepo.create({
        recipientEmail: e.recipientEmail,
        campaign,
        status: "pending",
      });
      await emailRepo.save(emailJob);
      console.log("Saved email job:", emailJob);
    }

    res.status(201).json({ message: "Campaign queued", campaignId: campaign.id });
  } catch (err) {
    console.error("Error saving campaign:", err);
    res.status(500).json({ message: "Server error" });
  }
};


// Simple email validation regex helper
const validateEmail = (email: string) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email.toLowerCase());
};
