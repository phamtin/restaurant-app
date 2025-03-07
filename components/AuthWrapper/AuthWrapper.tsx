"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";

const publicPaths = ["/signin"];

export default function AuthWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("auth_token");

    if (publicPaths.includes(pathname)) {
      setIsLoading(false);
    } else if (!token) {
      router.push("/signin");
    } else {
      setIsLoading(false);
    }
  }, [router, pathname]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return <>{children}</>;
}
