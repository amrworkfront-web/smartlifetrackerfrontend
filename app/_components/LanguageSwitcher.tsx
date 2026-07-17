"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "@/navigation";
import { Button } from "@/components/ui/button";

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const toggleLanguage = () => {
    const nextLocale = locale === "en" ? "ar" : "en";
    router.replace(pathname, { locale: nextLocale });
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleLanguage}
      className="h-8 w-8 font-medium bg-subtext/20 border border-gray-300 hover:cursor-pointer"
      aria-label={locale === "en" ? "Switch to Arabic" : "Switch to English"}
    >
      {locale === "en" ? "ع" : "En"}
    </Button>
  );
}
