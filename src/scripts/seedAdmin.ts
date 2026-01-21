import { prisma } from "../lib/prisma";
import { UserRole } from "../middleware/auth";

async function main() {
    const adminData = {
            name: "admin Saheb",
            email: "admin@gmail.com",
            role: UserRole.ADMIN,
            password: "admin1234"

        }
        //check user in database
        console.log("*****checking user in database**********"); 
        const existsUser = await prisma.user.findUnique({
            where:{
                email:adminData.email
            }
        })
        console.log("loading................users",existsUser);
        if(existsUser){
    
            throw new Error("User already exists in database")
        }
        console.log("save admin data to database.............");
        const signupAdmin = await fetch("http://localhost:3000/api/auth/sign-up/email", {
            method:"POST",
            headers:{
                 "Content-Type": "application/json",
                 "Origin": "http://localhost:3000"
            },
            body:JSON.stringify(adminData)
        })
        console.log(signupAdmin);
        console.log('*********update email verified');
        if(signupAdmin.ok){
            await prisma.user.update({
                where:{
                    email:adminData.email,
                },
                data:{
                    emailVerified:true
                }
            })
            
        }
        console.log('***********success*************');
}
main()