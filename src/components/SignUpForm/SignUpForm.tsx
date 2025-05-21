"use client";
import CardPostal from "@/components/CardPostal/CardPostal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useState } from "react";
import { signUp } from "./action";

function SignUpForm() {
  const [form, setForm] = useState<{
    name: string;
    email: string;
    password: string;
  }>({
    name: "",
    email: "",
    password: "",
  });

  const handleClick = async () => {
    await signUp(form);
  };

  return (
    <section className="h-dvh w-dvw flex justify-center items-center gap-10 perspective-distant bg-[url(/background-pencil.png)]">
      <div className="flex flex-col gap-5 sm:w-90 sm:h-120 sm:p-10 w-80 h-110 p-8 rounded-xl border border-gray-300 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.7)] bg-white/93">
        <h1 className="text-center text-3xl mb-4">Start your journey</h1>
        <div className="">
          <Label htmlFor="name" className="ml-1 mb-2">
            Name
          </Label>
          <Input
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            value={form.name}
            id="name"
            placeholder="your name..."
            className=""
          />
        </div>
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
          Sign up
        </Button>
        <p className="text-center">
          Already have an account?{" "}
          <Link
            href={"/login"}
            className="text-[#08a6ba] hover:underline underline-offset-2"
          >
            Log in
          </Link>
        </p>
      </div>
      <CardPostal />
    </section>
  );
}

export default SignUpForm;
