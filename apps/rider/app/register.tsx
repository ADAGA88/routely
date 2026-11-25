import { useEffect } from "react";
import { AppShell } from "@routely/ui-mobile";
import { useRouter } from "expo-router";

export default function RegisterScreen() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/auth/phone");
  }, [router]);

  return <AppShell appName="Routely Rider" description="" status="loading" />;
}
