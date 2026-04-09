import { NextResponse } from "next/server";

import { supportedNetworks } from "@/lib/gateway-data";

export function GET() {
  return NextResponse.json({
    source: "discover_networks",
    total: supportedNetworks.length,
    lastUpdated: "2026-04-09",
    networks: supportedNetworks
  });
}
