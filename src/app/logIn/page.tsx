import CardPostal from "@/components/CardPostal/CardPostal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

function page() {
  return (
    <section className="h-dvh w-dvw flex justify-center items-center gap-10 perspective-distant bg-[url(/background-pencil.png)]">
      <div className="flex flex-col gap-5 sm:w-90 sm:h-120 sm:p-10 w-80 h-110 p-8 rounded-xl border border-gray-300 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.7)] bg-white">
        <h1 className="text-center text-3xl mb-12">Welcome Back</h1>
        <div className="">
          <Label htmlFor="email" className="ml-1 mb-2">
            Email address
          </Label>
          <Input
            type="email"
            // onChange={(e) => setNewLabel(e.target.value)}
            // value={newLabel}
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
            // onChange={(e) => setNewLabel(e.target.value)}
            // value={newLabel}
            id="password"
            placeholder="your password..."
            className=""
          />
        </div>
        <Button className="w-full bg-blue-500 hover:bg-blue-700/90">
          Log in
        </Button>
        <p className="text-center">
          {"Don't have an account? "}
          <Link
            href={"/signup"}
            className="text-blue-500 hover:underline underline-offset-2"
          >
            Sign up
          </Link>
        </p>
      </div>
      <CardPostal />
    </section>
  );
}

export default page;
