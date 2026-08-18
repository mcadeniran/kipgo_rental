import {headers} from "next/headers";
import {redirect} from "next/navigation";

const GOOGLE_PLAY_URL =
  "https://play.google.com/store/apps/details?id=com.kipgotaxi.app";

const APP_STORE_URL =
  "https://apps.apple.com/tr/app/kipgo/id6754942525";

export default async function DownloadAppRedirectPage() {
  const headersList = await headers();

  const userAgent = headersList.get("user-agent")?.toLowerCase() ?? "";

  const isAndroid = userAgent.includes("android");

  const isIPhone =
    userAgent.includes("iphone") ||
    userAgent.includes("ipad") ||
    userAgent.includes("ipod");

  if (isAndroid) {
    redirect(GOOGLE_PLAY_URL);
  }

  if (isIPhone) {
    redirect(APP_STORE_URL);
  }

  // Desktop / unknown device
  redirect("/download");
}