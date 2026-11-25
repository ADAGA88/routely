import { useRouter } from "expo-router";
import { AccountStatusScreen } from "../../src/features/auth/account-status-screen";

export default function RiderAccountStatusRoute() {
  const router = useRouter();

  return (
    <AccountStatusScreen
      onBack={() => router.replace("/")}
      onReturnToWelcome={() => router.replace("/")}
    />
  );
}
