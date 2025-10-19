import { FaGoogle } from "react-icons/fa";
import { Button } from "./ui/button";
import { signIn } from "@/lib/auth-client";
import { toast } from "sonner";

export const GoogleButton = () => {
  const handleSignIn = async () => {
    try {
      const { error } = await signIn.social({
        provider: "google",
        callbackURL: "/gallery",
      });

      if (error) {
        toast.error(error.message || "Google sign in failed");
      } else {
        toast.success("Login successful!");
      }
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "Google sign in failed";
      toast.error(errorMessage);
    }
  };

  return (
    <>
      <Button
        className="cursor-pointer"
        variant="outline"
        type="button"
        onClick={handleSignIn}
      >
        <FaGoogle /> Continue with Google
      </Button>
    </>
  );
};
