import app from "./app";
import { prisma } from "./lib/prisma";
const PORT = process.env.PORT || 3001
async function main() {
    try {
        console.log("Database connected");
        await prisma.$connect()
        app.listen(PORT, () => {
            console.log("Server is running in", PORT);
        })
    } catch (error) {
        console.log("server error in server.ts", error);
        await prisma.$disconnect()
        process.exit(1)
    }
}
main()