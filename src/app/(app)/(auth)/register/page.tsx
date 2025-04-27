import { RegisterView } from "@/app/modules/auth/ui/views/register-view";
import { caller } from "@/trpc/server";
import { redirect } from "next/navigation";

const RegisterPage = async () => {
  const session = await caller.auth.session();
  if (session.user) {
    redirect("/");
  }
  return <RegisterView />;
};

export default RegisterPage;
