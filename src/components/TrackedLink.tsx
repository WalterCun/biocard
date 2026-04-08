"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface TrackedLinkProps {
  href: string;
  linkId: string;
  profileId: string;
  children: React.ReactNode;
  className?: string;
  target?: string;
  rel?: string;
}

export function TrackedLink({
  href,
  linkId,
  profileId,
  children,
  className,
  target,
  rel,
}: TrackedLinkProps) {
  const [visited, setVisited] = useState(false);

  const handleClick = async (e: React.MouseEvent) => {
    if (visited) return;

    try {
      await fetch("/api/analytics/click", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          profileId,
          linkId,
          userAgent: navigator.userAgent,
        }),
      });
      setVisited(true);
    } catch (error) {
      console.error("Error tracking click:", error);
    }
  };

  // Check if it's an external link
  const isExternal =
    href.startsWith("http") && !href.includes("localhost:3000");

  if (isExternal) {
    return (
      <a
        href={href}
        target={target || "_blank"}
        rel={rel || "noopener noreferrer"}
        className={className}
        onClick={handleClick}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={className} onClick={handleClick}>
      {children}
    </Link>
  );
}
