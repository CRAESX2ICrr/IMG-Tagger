import { FaGoogle } from "react-icons/fa";
import { Button } from "./ui/button";
import { signIn } from "@/lib/auth-client";
import { toast } from "sonner";
export const GoogleButton = () => {
  const handleSignIn = async () => {
    await signIn.social({ provider: "google", callbackURL: "/gallery" });
    toast.success("Account Successfully created");
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
