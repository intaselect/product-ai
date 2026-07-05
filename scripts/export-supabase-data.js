require("dotenv").config({ path: ".env.local" });
const fs = require("fs");
const path = require("path");
const { createClient } = require("@supabase/supabase-js");

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const TABLES = [
  "customer_offers",
  "daily_deals",
  "search_terms",
  "product_cache",
  "profiles",
  "seo_landing_pages",
  "store_leads",
];

async function exportTable(table) {
  let allRows = [];
  let from = 0;
  const size = 1000;

  while (true) {
    const to = from + size - 1;

    const { data, error } = await supabase
      .from(table)
      .select("*")
      .range(from, to);

    if (error) {
      console.error(`❌ ${table}:`, error.message);
      return;
    }

    if (!data || data.length === 0) break;

    allRows.push(...data);
    console.log(`✅ ${table}: loaded ${allRows.length}`);

    if (data.length < size) break;
    from += size;
  }

  const dir = path.join(process.cwd(), "data");
  fs.mkdirSync(dir, { recursive: true });

  fs.writeFileSync(
    path.join(dir, `${table}.json`),
    JSON.stringify(allRows, null, 2),
    "utf8"
  );

  console.log(`💾 saved data/${table}.json (${allRows.length} rows)`);
}

async function main() {
  for (const table of TABLES) {
    await exportTable(table);
  }

  console.log("🎉 Export finished");
}

main();