import nodemailer from 'nodemailer';

type StageChangeEmail = {
    to: string;
    applicantName: string;
    jobTitle: string;
    stage: string;
}

function getTransport() {
    const host = process.env.SMTP_HOST;
    const port = Number(process.env.SMTP_PORT);
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;
    const from = process.env.SMTP_FROM;

    if (!host || !port || !user || !pass || !from) {
        return null;
    }

    return {
        from,
        transporter: nodemailer.createTransport({
            host,
            port,
            secure: port === 465,
            auth: { user, pass },
        }),
    };
}

export async function sendStageChangeEmail({ to, applicantName, jobTitle, stage }: StageChangeEmail) {
    const mail = getTransport();
    if (!mail) {
        console.error("Missing SMTP_HOST/PORT/USER/PASS/FROM; skipped stage-change email");
        return;
    }
    const greeting = applicantName.trim() || "there";
    const subject = `Your ${jobTitle} application has been moved to the ${stage} stage`;
    const text = `Hi ${greeting},\n\nYour application for ${jobTitle} was updated to: ${stage}.\n\nYou can check the latest status on your Hirelane dashboard.\n`;

    try {
        await mail.transporter.sendMail({
            from : mail.from,
            to, subject, text
        });
    } catch(error) {
        console.error("Stage-change email failed", error);
    }
}