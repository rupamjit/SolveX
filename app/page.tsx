import { ComponentExample } from "@/components/component-example";
import { onBoardUser } from "@/modules/auth/actions/auth";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function Page() {
const { userId } = await auth();
 if (userId) {
    await onBoardUser(); 
    redirect("/dashboard");
  }
return <ComponentExample />;
}