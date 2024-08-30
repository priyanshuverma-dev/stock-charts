"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Button } from "./ui/button";
import { Icons } from "./icons";
import Link from "next/link";
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";

const AuthModal = () => {
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const r = usePathname();

  const searchParams = useSearchParams();
  const callback = searchParams.get("callbackUrl");

  const handleOnOpenChange = (open: boolean) => {
    router.back();
  };

  async function onLogin(provider: "github" | "google") {
    try {
      setIsLoading(true);
      const res = await signIn(provider, {
        redirect: false,
      });
      if (res?.error) throw new Error(res.error);
      if (res?.ok) {
        toast.success(`Success: Authenticated`);
        if (callback) {
          router.push(callback);
        } else {
          router.push("/dashboard");
        }
      }
    } catch (error: any) {
      console.log(error);
      toast.error(`Error: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Dialog open={r === "/auth"} onOpenChange={handleOnOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-center">Authenticate Now</DialogTitle>
          <DialogDescription>
            <div className="flex justify-center items-center p-4 flex-col">
              <div className="flex">
                <p>
                  By authenticating, you agree to our{" "}
                  <Link
                    href="/terms"
                    className="text-blue-500 hover:underline"
                    target="_blank"
                  >
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link
                    href="/privacy"
                    className="text-blue-500 hover:underline"
                    target="_blank"
                  >
                    Privacy Policy
                  </Link>
                  .
                </p>
              </div>

              <Button
                type="button"
                onClick={() => onLogin("github")}
                disabled={isLoading}
                className="mt-4 w-full sm:w-auto"
              >
                {isLoading ? (
                  <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Icons.gitHub className="mr-2 h-4 w-4" />
                )}
                Authenticate with Github
              </Button>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;
