import { LoginView } from "@/app/modules/auth/ui/views/login-view";
import { caller } from "@/trpc/server";
import { redirect } from "next/navigation";

const LoginPage = async () => {
  const session = await caller.auth.session();
  if (session.user) {
    redirect("/");
  }

  return <LoginView />;
};

export default LoginPage;
