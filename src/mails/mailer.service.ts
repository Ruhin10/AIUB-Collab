import { Injectable, Logger } from "@nestjs/common";
import * as nodemailer from "nodemailer";

@Injectable()
export class MailerService {
    private readonly logger = new Logger(MailerService.name);

    private readonly transporter = nodemailer.createTransport({
        host: process.env.MAILER_HOST,
        port: Number(process.env.MAILER_PORT),
        secure: process.env.MAILER_SECURE === "true",
        auth: {
            user: process.env.MAILER_USER,
            pass: process.env.MAILER_PASSWORD,
        },
    });

    async sendWelcomeEmail(recipientEmail: string, recipientName: string): Promise<void> {
        await this.transporter.sendMail({
            from: process.env.MAILER_FROM,
            to: recipientEmail,
            subject: "Welcome to AIUB Collab",
            text: `Hi ${recipientName}, welcome to AIUB Collab.`,
            html: `
                <h2>Welcome to AIUB Collab</h2>
                <p>Hi ${recipientName}, your account has been created successfully.</p>
                <p>You can now explore offered research and project collaborations.</p>
            `,
        });
        this.logger.log(`Welcome email sent to ${recipientEmail}`);
    }
}