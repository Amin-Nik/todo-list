"use client";
import CardPostal from "@/components/CardPostal/CardPostal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import Link from "next/link";
import { logIn } from "./action";

function LogInForm() {
  const [form, setForm] = useState<{
    email: string;
    password: string;
  }>({
    email: "",
    password: "",
  });

  const handleClick = async () => {
    await logIn(form);
  };

  return (
    <section className="h-dvh w-dvw flex justify-center items-center gap-10 perspective-distant bg-[url(/background-pencil.png)]">
      <div className="flex flex-col gap-5 sm:w-90 sm:h-120 sm:p-10 w-80 h-110 p-8 rounded-xl border border-gray-300 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.7)] bg-white/93">
        <h1 className="text-center text-3xl mb-12">Welcome Back</h1>
        <div className="">
          <Label htmlFor="email" className="ml-1 mb-2">
            Email address
          </Label>
          <Input
            type="email"
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            value={form.email}
            id="email"
            placeholder="your email address..."
            className=""
          />
        </div>
        <div className="">
          <Label htmlFor="password" className="ml-1 mb-2">
            Password
          </Label>
          <Input
            type="password"
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            value={form.password}
            id="password"
            placeholder="your password..."
            className=""
          />
        </div>
        <Button
          onClick={handleClick}
          className="w-full bg-[#08a6ba] hover:bg-[#08a6ba]/80"
        >
          Log in
        </Button>
        <p className="text-center">
          {"Don't have an account? "}
          <Link
            href={"/signup"}
            className="text-[#08a6ba] hover:underline underline-offset-2"
          >
            Sign up
          </Link>
        </p>
      </div>
      <CardPostal />
    </section>
  );
}

export default LogInForm;
