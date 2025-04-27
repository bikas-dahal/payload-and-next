"use client";

import { useForm } from "react-hook-form";
import {
  loginSchema,
  LoginType,
} from "../../schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Link from "next/link";
import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTRPC } from "@/trpc/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin", "latin-ext"],
  variable: "--font-poppins",
});

export const LoginView = () => {
  const router = useRouter();
  const trpc = useTRPC();
  const queryClient = useQueryClient();

  const login = useMutation(
    trpc.auth.login.mutationOptions({
      onError: (error) => toast.error(error.message),
      onSuccess: async () => {
        await queryClient.invalidateQueries(trpc.auth.session.queryOptions());
        toast.success("Logged in successfully");
        router.push("/");
      },
    })
  );

  const form = useForm<LoginType>({
    mode: "onChange",
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginType) => {
    login.mutate(data);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 h-screen w-full items-center justify-center">
      <div className="bg-[#f4f4f4] h-screen w-full lg:col-span-3 overflow-y-auto">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-4 p-6 lg:p-10"
          >
            <div className="flex items-center justify-between mb-8">
              <Link href={"/"} className="flex items-center gap-2">
                <span
                  className={cn("text-2xl font-semibold", poppins.className)}
                >
                  Payload
                </span>
              </Link>
              <Button
                asChild
                variant={"ghost"}
                className="text-base border-none"
              >
                <Link
                  prefetch
                  href={"/register"}
                  className="text-sm font-medium hover:underline"
                >
                  Register
                </Link>
              </Button>
            </div>
            <h1 className="text-3xl font-semibold text-slate-900 dark:text-slate-100">
              Welcome Back
            </h1>

            <FormField
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base">Email</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
            <FormField
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base">Password</FormLabel>
                  <FormControl>
                    <Input {...field} type="password" />
                  </FormControl>

                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
            <Button
              disabled={login.isPending}
              type="submit"
              variant={"elevated"}
              className="w-full mt-4 bg-black text-white hover:bg-pink-400 hover:text-primary text-lg"
            >
              Login
            </Button>
          </form>
        </Form>
      </div>
      <div
        className="h-screen w-full hidden lg:block lg:col-span-2 items-center justify-center"
        style={{
          backgroundImage: "url('/wow.jpeg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
    </div>
  );
};
