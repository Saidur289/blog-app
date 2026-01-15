import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";
import { sendEmail } from "./email";
// If your Prisma file is located elsewhere, you can change the path



export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "postgresql", // or "mysql", "postgresql", ...etc
    }),
    user: {
        additionalFields: {
            role: {
                type: "string",
                defaultValue: 'USER',
                required: false,
            },
            phone: {
                type: 'string',
                required: false
            },
            status: {
                type: 'string',
                defaultValue: "ACTIVE",
                required: false
            }
        }
    },
    trustedOrigins: [process.env.BLOG_APP_URL!],
    emailAndPassword: {
        enabled: true,
        autoSignIn: false,
        requireEmailVerification: true
    },
    emailVerification:{
        sendOnSignUp: true,
        autoSignInAfterVerification: true,
        sendVerificationEmail: async ({ user, url, token }, request) => {
            console.log("verification...........", user.email, token);
            await sendEmail(
                user.email,
                `Click the button below to verify your email`,
                "Verify your email address",
                url
            )
     
    }
  
  },
    
});