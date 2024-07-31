"use client";
import { Button, Card, CardBody, CardFooter, Input } from "@nextui-org/react";
import Link from "next/link";

export default function Login() {
  return (
    <div className="flex flex-col items-center justify-center">
      <Card className="w-full max-w-md h-full p-4">
        <div className="flex flex-col items-center justify-center p-5">
          <p className="text-3xl font-bold">Login</p>
          <p className="mt-2 text-small text-default-500">
            Enter your email and password to login to your account.
          </p>
        </div>

        <CardBody className="space-y-4">
          <div className="space-y-2">
            <Input required id="email" label="Email" size="sm" type="email" />
          </div>
          <div className="space-y-2">
            <Input
              required
              id="password"
              label="Password"
              size="sm"
              type="password"
            />
          </div>
        </CardBody>
        <CardFooter>
          <Button className="w-full bg-gradient-to-r from-[#00b7fa] to-[#01cfea]">
            Login
          </Button>
        </CardFooter>
        <div className="my-4 text-center">
          <span className="text-sm">Need to create an account?</span>
          <Link
            className="text-sm text-blue-500"
            href="/register"
            prefetch={false}
          >
            Sign up
          </Link>
        </div>
      </Card>
    </div>
  );
}
