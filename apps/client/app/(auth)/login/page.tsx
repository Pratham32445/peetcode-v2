import LoginForm from "@/components/LoginForm";
import { FlameKindling } from "lucide-react";

export default function LoginPage() {
  return (
    <>
      <div className="relative flex min-h-screen flex-col items-center justify-center gap-6 p-6 md:p-10">
        <div className="flex relative w-full max-w-sm flex-col gap-6">
          <div className="flex-1 justify-center flex items-center gap-3">
            <FlameKindling color="#FFA116" />
            <p className="text-white text-2xl">PeetCode</p>
          </div>
          <LoginForm />
        </div>
      </div>
    </>
  );
}
