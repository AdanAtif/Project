import { withAuth } from "next-auth/middleware";
export default withAuth({
    pages:{
 signIn:"/Auth"
    }
})
export const config ={
    matcher:[
        "/Orders/:path*",
        "/Cart/:path*",  
    ]
}