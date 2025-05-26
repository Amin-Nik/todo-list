"use client";
import CardPostal from "@/components/CardPostal/CardPostal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useRef, useState } from "react";
import { signUp } from "./action";
import { LoaderCircle } from "lucide-react";

function SignUpForm() {
  const [form, setForm] = useState<{
    name: string;
    userName: string;
    password: string;
  }>({
    name: "",
    userName: "",
    password: "",
  });
  const [btnLoadingState, setBtnLoadingState] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      buttonRef.current?.click();
    }
  };

  const handleClick = async () => {
    try {
      setBtnLoadingState(true);
      await signUp(form);
    } catch (error) {
      if (
        error ==
          "Error: user name is taken \n please try again with another user name" ||
        error == "Error: name can't be empty" ||
        error == "Error: user name can't be empty" ||
        error == "Error: password can't be empty"
      ) {
        alert(error);
      }
    } finally {
      setBtnLoadingState(false);
    }
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
            onKeyDown={handleKeyDown}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            value={form.name}
            id="name"
            placeholder="your name..."
            className=""
          />
        </div>
        <div className="">
          <Label htmlFor="userName" className="ml-1 mb-2">
            User Name
          </Label>
          <Input
            onKeyDown={handleKeyDown}
            type="text"
            onChange={(e) => setForm({ ...form, userName: e.target.value })}
            value={form.userName}
            id="userName"
            placeholder="your User Name..."
            className=""
          />
        </div>
        <div className="">
          <Label htmlFor="password" className="ml-1 mb-2">
            Password
          </Label>
          <Input
            onKeyDown={handleKeyDown}
            type="password"
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            value={form.password}
            id="password"
            placeholder="your password..."
            className=""
          />
        </div>
        {btnLoadingState ? (
          <Button
            disabled
            ref={buttonRef}
            onClick={handleClick}
            className="w-full bg-[#08a6ba] hover:bg-[#08a6ba]/80"
          >
            <LoaderCircle className="animate-spin" />
            please wait...
          </Button>
        ) : (
          <Button
            ref={buttonRef}
            onClick={handleClick}
            className="w-full bg-[#08a6ba] hover:bg-[#08a6ba]/80"
          >
            Sign up
          </Button>
        )}
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
