"use client";
import { Button, Card, CardBody, CardFooter, Input } from "@nextui-org/react";
import Link from "next/link";

export default function Register() {
  return (
    <div className="flex flex-col items-center justify-center">
      <Card className="w-full max-w-md h-full p-4">
        <div className="flex flex-col items-center justify-center p-5">
          <p className="text-3xl font-bold">Sign Up</p>
          <p className="mt-2 text-small text-default-500">
            Let&apos;s get started
          </p>
        </div>

        <CardBody className="space-y-4">
          <div className="space-y-2">
            <Input required id="name" label="Name" size="sm" type="text" />
          </div>
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
          <span className="text-sm">Already have an account?</span>
          <Link
            className="text-sm text-blue-500"
            href="/login"
            prefetch={false}
          >
            Login
          </Link>
        </div>
      </Card>
    </div>
  );
}
