import type { Metadata } from "next";
import type { ReactNode } from "react";

import "./globals.css";

export const metadata: Metadata = {
  title: "Chain-Love: The Web3 MCP Gateway",
  description:
    "A futuristic landing-doc for a gateway that discovers chains, searches the Chain.Love registry, and proxies downstream MCP tools through one endpoint."
};

export default function RootLayout({
  children
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
