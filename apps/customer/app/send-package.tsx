import { Redirect } from "expo-router";
import { SendPackageScreen } from "../src/features/send-package/send-package-screen";

export default function SendPackageRoute() {
  if (!__DEV__) return <Redirect href="/" />;
  return <SendPackageScreen />;
}
