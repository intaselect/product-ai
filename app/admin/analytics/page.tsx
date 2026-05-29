import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export default async function AnalyticsDashboard() {
  const { data: events } = await supabase
    .from("analytics_events")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(1000);

  const rows = events || [];

  const pageViews = rows.filter((e) => e.event_type === "page_view");
  const searches = rows.filter((e) => e.event_type === "search");
  const offerClicks = rows.filter((e) => e.event_type === "offer_click");
  const sessions = rows.filter((e) => e.event_type === "session_end");

  const uniqueVisitors = new Set(
    rows.map((e) => e.visitor_id).filter(Boolean)
  ).size;

  const avgDuration =
    sessions.length > 0
      ? Math.round(
          sessions.reduce((sum, e) => sum + Number(e.duration_seconds || 0), 0) /
            sessions.length
        )
      : 0;

  function countBy(key: string, list = rows) {
    const map: Record<string, number> = {};

    list.forEach((item: any) => {
      const value = item[key] || "غير معروف";
      map[value] = (map[value] || 0) + 1;
    });

    return Object.entries(map)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 15);
  }

  const topSearches = countBy("query", searches);
  const topCountries = countBy("country", rows);
  const topPages = countBy("path", pageViews);
  const topOffers = countBy("offer_id", offerClicks);

  return (
    <main style={styles.page}>
      <h1 style={styles.title}>📊 لوحة تحليلات BPS Chat</h1>

      <div style={styles.grid}>
        <Card title="إجمالي الأحداث" value={rows.length} />
        <Card title="زوار مميزين" value={uniqueVisitors} />
        <Card title="زيارات الصفحات" value={pageViews.length} />
        <Card title="عمليات البحث" value={searches.length} />
        <Card title="ضغطات العروض" value={offerClicks.length} />
        <Card title="متوسط وقت الجلسة" value={`${avgDuration} ثانية`} />
      </div>

      <Section title="🔥 أكثر كلمات البحث" data={topSearches} />
      <Section title="🌍 أكثر الدول" data={topCountries} />
      <Section title="📄 أكثر الصفحات زيارة" data={topPages} />
      <Section title="🛒 أكثر العروض ضغطًا" data={topOffers} />

      <section style={styles.tableBox}>
        <h2 style={styles.sectionTitle}>آخر الأحداث</h2>

        <div style={{ overflowX: "auto" }}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th>النوع</th>
                <th>الزائر</th>
                <th>الدولة</th>
                <th>الصفحة</th>
                <th>البحث</th>
                <th>العرض</th>
                <th>المدة</th>
                <th>الوقت</th>
              </tr>
            </thead>

            <tbody>
              {rows.slice(0, 100).map((e: any) => (
                <tr key={e.id}>
                  <td>{e.event_type}</td>
                  <td>{e.visitor_id || "-"}</td>
                  <td>{e.country || "-"}</td>
                  <td>{e.path || "-"}</td>
                  <td>{e.query || "-"}</td>
                  <td>{e.offer_id || "-"}</td>
                  <td>{e.duration_seconds || "-"}</td>
                  <td>
                    {e.created_at
                      ? new Date(e.created_at).toLocaleString("ar-EG")
                      : "-"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}

function Card({ title, value }: { title: string; value: any }) {
  return (
    <div style={styles.card}>
      <div style={styles.cardTitle}>{title}</div>
      <div style={styles.cardValue}>{value}</div>
    </div>
  );
}

function Section({
  title,
  data,
}: {
  title: string;
  data: [string, number][];
}) {
  return (
    <section style={styles.box}>
      <h2 style={styles.sectionTitle}>{title}</h2>

      {data.length === 0 ? (
        <p style={styles.empty}>لا توجد بيانات حتى الآن</p>
      ) : (
        data.map(([name, count]) => (
          <div key={name} style={styles.row}>
            <span>{name}</span>
            <strong>{count}</strong>
          </div>
        ))
      )}
    </section>
  );
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: "100vh",
    padding: "40px 18px",
    background:
      "radial-gradient(circle at top, rgba(6,182,212,.18), transparent 35%), #020617",
    color: "white",
    direction: "rtl",
  },
  title: {
    textAlign: "center",
    fontSize: 34,
    marginBottom: 30,
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
    gap: 16,
    maxWidth: 1200,
    margin: "0 auto 28px",
  },
  card: {
    background: "rgba(15,23,42,.92)",
    border: "1px solid rgba(34,211,238,.25)",
    borderRadius: 18,
    padding: 20,
    boxShadow: "0 0 24px rgba(6,182,212,.12)",
  },
  cardTitle: {
    color: "#94a3b8",
    fontSize: 14,
    marginBottom: 10,
  },
  cardValue: {
    fontSize: 30,
    fontWeight: 900,
    color: "#22d3ee",
  },
  box: {
    maxWidth: 1200,
    margin: "0 auto 22px",
    background: "rgba(15,23,42,.88)",
    border: "1px solid rgba(148,163,184,.18)",
    borderRadius: 18,
    padding: 20,
  },
  tableBox: {
    maxWidth: 1200,
    margin: "0 auto",
    background: "rgba(15,23,42,.88)",
    border: "1px solid rgba(148,163,184,.18)",
    borderRadius: 18,
    padding: 20,
  },
  sectionTitle: {
    marginBottom: 16,
    fontSize: 22,
  },
  row: {
    display: "flex",
    justifyContent: "space-between",
    borderBottom: "1px solid rgba(148,163,184,.12)",
    padding: "12px 0",
    gap: 20,
  },
  empty: {
    color: "#94a3b8",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    fontSize: 13,
    minWidth: 900,
  },
};