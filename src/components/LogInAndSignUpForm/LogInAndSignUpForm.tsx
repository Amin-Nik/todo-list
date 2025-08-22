"use client";

import CardPostal from "@/components/CardPostal/CardPostal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LoaderCircle } from "lucide-react";
import { logIn, signUp } from "./action";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { userSchema } from "@/lib/zod/schema";
import { z } from "zod";

const loginSchema = userSchema.omit({ name: true });

function LogInAndSignUpForm({ isSignUp }: { isSignUp: boolean }) {
  document.body.className = "default";

  type UserSchema = z.infer<typeof userSchema>;
  type LoginSchema = z.infer<typeof loginSchema>;

  type FormSchema = Partial<UserSchema> &
    Pick<LoginSchema, "userName" | "password">;

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormSchema>({
    resolver: zodResolver(isSignUp ? userSchema : loginSchema),
  });

  const onSubmit = async (data: FormSchema) => {
    try {
      return isSignUp ? await signUp(data) : await logIn(data);
    } catch (error) {
      const strError = error instanceof Error ? error.message : "Server error";
      if (strError !== "NEXT_REDIRECT")
        setError("root", { type: "server", message: strError });
    }
  };

  return (
    <section className="h-dvh w-dvw flex justify-center items-center gap-10 perspective-distant bg-[url(/background-pencil.png)]">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col justify-around sm:w-90 sm:h-120 sm:p-10 w-80 h-110 p-8! rounded-xl border border-gray-300 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.7)] bg-white/93"
      >
        <h1 className={`text-center text-3xl ${isSignUp ? "mb-4" : "mb-6"}`}>
          {isSignUp ? "Start your journey" : "Welcome Back"}
        </h1>
        {isSignUp && (
          <div>
            <Label htmlFor="name" className="ml-1 mb-2">
              Name
            </Label>
            <Input {...register("name")} id="name" placeholder="your name..." />
            <p className="text-red-500 ml-2">{errors.name?.message}</p>
          </div>
        )}
        <div>
          <Label htmlFor="userName" className="ml-1 mb-2">
            User Name
          </Label>
          <Input
            {...register("userName")}
            id="userName"
            placeholder="your User Name..."
          />
          <p className="text-red-500 ml-2">{errors.userName?.message}</p>
        </div>
        <div>
          <Label htmlFor="password" className="ml-1 mb-2">
            Password
          </Label>
          <Input
            type="password"
            {...register("password")}
            id="password"
            placeholder="your password..."
          />
          <p className="text-red-500 ml-2">{errors.password?.message}</p>
        </div>
        <div>
          <p className="text-red-500 text-center mb-2">
            {errors.root?.message}
          </p>
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-[#08a6ba] hover:bg-[#08a6ba]/80"
          >
            {isSubmitting && (
              <>
                <LoaderCircle className="animate-spin" />
                please wait...
              </>
            )}
            {isSubmitting || <>{isSignUp ? "Sign up" : "Log in"}</>}
          </Button>
        </div>
        <p className="text-center">
          {isSignUp ? "Already have an account? " : "Don't have an account? "}
          <Link
            href={isSignUp ? "/login" : "/signup"}
            className="text-[#08a6ba] hover:underline underline-offset-2"
          >
            {isSignUp ? "Log in" : "Sign up"}
          </Link>
        </p>
      </form>
      <CardPostal />
    </section>
  );
}

export default LogInAndSignUpForm;
