import { NextResponse } from "next/server";
import { google } from "googleapis";
import { createClient } from "@supabase/supabase-js";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const SITE_URL = "https://www.bpschat.com/";

function getDate(daysAgo: number) {
  const d = new Date();
  d.setDate(d.getDate() - daysAgo);
  return d.toISOString().slice(0, 10);
}

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const secret = url.searchParams.get("secret");

    if (secret !== process.env.CRON_SECRET) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const credentialsRaw = process.env.SEARCH_CONSOLE_CREDENTIALS;

    if (!credentialsRaw) {
      return NextResponse.json(
        { error: "Missing SEARCH_CONSOLE_CREDENTIALS" },
        { status: 500 }
      );
    }

    const credentials = JSON.parse(credentialsRaw);

    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: ["https://www.googleapis.com/auth/webmasters.readonly"],
    });

    const searchconsole = google.searchconsole({
      version: "v1",
      auth,
    });

    const startDate = getDate(30);
    const endDate = getDate(2);

    const response = await searchconsole.searchanalytics.query({
      siteUrl: SITE_URL,
      requestBody: {
        startDate,
        endDate,
        dimensions: ["query", "page"],
        rowLimit: 1000,
        startRow: 0,
      },
    });

    const rows = response.data.rows || [];

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    const payload = rows.map((row: any) => ({
      query: row.keys?.[0] || "",
      page: row.keys?.[1] || "",
      clicks: Math.round(row.clicks || 0),
      impressions: Math.round(row.impressions || 0),
      ctr: row.ctr || 0,
      position: row.position || 0,
      start_date: startDate,
      end_date: endDate,
    }));

    if (payload.length > 0) {
      const { error } = await supabase
        .from("search_console_queries")
        .insert(payload);

      if (error) throw error;
    }

    return NextResponse.json({
      success: true,
      inserted: payload.length,
      startDate,
      endDate,
    });
  } catch (error: any) {
    console.error("Search Console Sync Error:", error);

    return NextResponse.json(
      {
        success: false,
        error: error?.message || "Unknown error",
      },
      { status: 500 }
    );
  }
}