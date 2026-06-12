import { unstable_cache } from "next/cache";
import { createClient } from "@supabase/supabase-js";

type Deal = {
  id: number;
  title: string;
  image_url: string | null;
  discount_percent: number | null;
};

const getDailyDeals = unstable_cache(
  async () => {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    const { data } = await supabase
      .from("daily_deals")
      .select("id,title,image_url,discount_percent")
      .eq("status", "approved")
      .order("discount_percent", { ascending: false })
      .limit(8);

    return (data || []) as Deal[];
  },
  ["daily-deals-banner"],
  { revalidate: 3600 }
);

export default async function DailyDealsBanner() {
  const deals = await getDailyDeals();

  return (
    <section className="dailyDealsNewsBanner" dir="rtl">
      <a href="/daily-deals" className="dailyDealsNewsLink">
        <div className="dailyDealsNewsText">
          <span className="dailyDealsNewsBadge">🔥 عروض اليوم</span>

          <strong>تصفح جميع عروض بلدك محدثة يوميًا من فريق BPS Chat</strong>

          <small>
            🇪🇬 مصر · 🇸🇦 السعودية · 🇰🇼 الكويت · 🇦🇪 الإمارات · 🇶🇦 قطر · 🇧🇭 البحرين
          </small>
        </div>

        {deals.length > 0 && (
          <div className="dailyDealsNewsImages">
            {deals.map((deal) => (
              <div className="dailyDealsNewsImage" key={deal.id}>
                {deal.image_url ? (
                  <img src={deal.image_url} alt={deal.title} loading="lazy" />
                ) : (
                  <span>🔥</span>
                )}

                {Number(deal.discount_percent || 0) > 0 && (
                  <b>{Math.round(Number(deal.discount_percent))}%</b>
                )}
              </div>
            ))}
          </div>
        )}

        <span className="dailyDealsNewsBtn">شاهد العروض ←</span>
      </a>
    </section>
  );
}