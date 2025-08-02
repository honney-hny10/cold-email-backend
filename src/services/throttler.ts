import { AppDataSource } from "../data-source";
import { EmailJob } from "../entities/EmailJob";

function sendEmailMock(to: string): boolean {
  // Simulate 90% success rate
  return Math.random() > 0.1;
}

export const startThrottler = () => {
  setInterval(async () => {
    const emailRepo = AppDataSource.getRepository(EmailJob);
    const jobs = await emailRepo.find({ where: { status: "pending" }, take: 5 });

    for (const job of jobs) {
      const success = sendEmailMock(job.recipientEmail);  // <-- use recipientEmail
      job.status = success ? "sent" : "failed";
      await emailRepo.save(job);
      console.log(`Email to ${job.recipientEmail}: ${success ? "✅ Sent" : "❌ Failed"}`);
    }
  }, 60 * 1000); // every 1 minute
};
