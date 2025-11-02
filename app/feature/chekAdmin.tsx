import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";

export default async function Check(){

const session = await getServerSession(authOptions);
return (session?.user?.role
) 

}
