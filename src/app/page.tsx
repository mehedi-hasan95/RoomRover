import { Header } from "@/components/auth/header";
import { LoginButton } from "@/components/auth/login-button";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="commonCss">
      <div className="space-y-6 text-center flex flex-col">
        <Header title="Wellcome to my demo" label="What are you want for?" />
        <LoginButton mode="modal" asChild>
          <Button>Login</Button>
        </LoginButton>
      </div>
    </main>
  );
}
