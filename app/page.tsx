"use client";
import { useEffect, useRef, useState } from "react";
import { saveSearch } from "@/lib/saveSearch";
import { supabase } from "@/lib/supabase";
import PopularSearches from "@/app/components/PopularSearches";
import type React from "react";

export default function Home() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [country, setCountry] = useState("sa");
  const [menuOpen, setMenuOpen] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);
  const [user, setUser] = useState<any>(null);
useEffect(() => {
  const slider = sliderRef.current;
  if (!slider) return;

  let direction = 1;
  let isPaused = false;

  const handleMouseEnter = () => {
    isPaused = true;
  };

  const handleMouseLeave = () => {
    isPaused = false;
  };

  slider.addEventListener("mouseenter", handleMouseEnter);
  slider.addEventListener("mouseleave", handleMouseLeave);

  const interval = setInterval(() => {
    if (isPaused) return;

    const maxScrollLeft = slider.scrollWidth - slider.clientWidth;

    if (slider.scrollLeft >= maxScrollLeft - 2) {
      direction = -1;
    }

    if (slider.scrollLeft <= 2) {
      direction = 1;
    }

    slider.scrollLeft += 0.5 * direction;
  }, 50);

  return () => {
    clearInterval(interval);
    slider.removeEventListener("mouseenter", handleMouseEnter);
    slider.removeEventListener("mouseleave", handleMouseLeave);
  };
}, []);
useEffect(() => {
  supabase.auth.getUser().then(({ data }) => {
    setUser(data?.user || null);
  });

  const { data: listener } = supabase.auth.onAuthStateChange(
    (event, session) => {
      setUser(session?.user || null);
    }
  );

  return () => {
    listener.subscription.unsubscribe();
  };
}, []);
  // 🔥 Ads حسب الدولة
  const adsByCountry: any = {
    sa: [
         {
         title: "  ابل - ايفون 16 برو ماكس، 5 جي،6.9 بوصة، بسعة 256 جيجا، الوان متعددة ",
          price: "4999 ريال",
        image: "https://cdn.salla.sa/XnEj/ec192eee-4b7c-450e-bb33-59760386b80b-1000x1000-2hFDNYNVi8WffASJvRTIOzmEb9AnZNRiTYHsOEUr.jpg",
        url: "https://iblackstores.com/EXlWDyR",
      },
      
      {
        title: "هاتف M-HORSE M17 Pro Max بشريحة NFC",
         price: "640 ريال",
        image: "https://f.nooncdn.com/p/pzsku/Z8624F7B143240BB93FE8Z/45/_/1776758597/0344f741-c522-4be7-a941-e224e31da88d.jpg?width=800",
        url: "https://www.noon.com/saudi-ar/m-horse-m17-pro-max-smartphone-with-nfc-6-6-hd-display-12gb-ram-256gb-storage-5000mah-battery-4g-lte-orange/Z8624F7B143240BB93FE8Z/p/?o=ec9dffd89856be8e&shareId=179b3563-6d3c-431c-b36a-8a6cb1575c5a",
      },
      {
        title: "  ايمالا بني فاتح ",
         price: "65 ريال",
        image: "https://f.nooncdn.com/p/pzsku/Z790903813A6E938BD103Z/45/_/1774181456/fa477ac5-a671-4c72-b790-17db19878dc6.jpg?width=800",
        url: "https://www.noon.com/saudi-ar/aymala-lenses-milk-tea/Z790903813A6E938BD103Z/p/?o=bbfa478ebae78e7a&shareId=cd8114c0-34d4-407d-9537-ccf927cdeb15",
      },
      {
        title: " بروتين مصل الحليب بنسبة 100% من Gold Standard   ",
         price: "390 ريال",
        image: "https://f.nooncdn.com/p/pzsku/ZFBF8D70FD73EB9D7E4D0Z/45/_/1772091006/411bfd34-493e-49b6-803c-09eff6e75bd6.jpg?width=800",
        url: "https://www.noon.com/saudi-ar/on-100-wgs-gf-french-van-creme-5lb/N53418656A/p/?o=ac6859087cfa841a&shareId=7e532f52-14c6-4a2b-999a-9af49f0a379c",
      },
      {
        title: "   باور بانك من إينيو 10000 مللي امبير بشحن 3 ساعات",
         price: "79 ريال",
        image: "https://m.media-amazon.com/images/I/71z6XmCKqZL._AC_SX679_.jpg",
        url: "https://www.amazon.sa/%D8%A5%D9%8A%D9%86%D9%8A%D9%88-10000-%D8%AA%D8%A7%D9%8A%D8%A8-C-%D9%84%D9%84%D9%87%D9%88%D8%A7%D8%AA%D9%81-%D8%A7%D9%84%D8%AA%D8%A7%D8%A8%D9%84%D8%AA/dp/B08VD632WJ/ref=sr_1_5?dib=eyJ2IjoiMSJ9.GxmG0Lmdi9Wv3f3N9RcEJXyNm_qhs-zY6pktVC4nMgJc9uzzX14Yz_YOlTDocfa84V_z4QcifkplHCgkC8GF18cPT2gDmPpRZ9Kq_VceBPmxtloffa-WmDosxYBWr899W9oDIAM-VDFE_tjrU6BuQCNpvca4_rG7eD9iDKZRuO4JYLDYki2YYTtpfayIHj_mh27Vvzx5tnBBRf5G0W3MRdYfmY0RoTMgaZBgSTy0QjPcSLvbsQg4anXLHTXNJZCb25xmQSwg2t2PBNiX1B-OG8PDyYpJ2czPUAcYgrUZNgg.LOYzW8E-XwUq1j5jJPlnP6oWYgYuo4SC2BZySAC3txQ&dib_tag=se&keywords=power+bank&qid=1778353921&sr=8-5",
      },
      {
        title: " لعبة سيارة ركوب للاطفال مع عجلة قيادة ومسند ظهر (اسود)",
         price: "52 ريال",
        image: "https://m.media-amazon.com/images/I/61YTh19mDoL._AC_SY879_.jpg",
        url: "https://www.amazon.sa/%D9%84%D8%B9%D8%A8%D8%A9-%D8%B3%D9%8A%D8%A7%D8%B1%D8%A9-%D9%84%D9%84%D8%A7%D8%B7%D9%81%D8%A7%D9%84-%D9%82%D9%8A%D8%A7%D8%AF%D8%A9-%D9%88%D9%85%D8%B3%D9%86%D8%AF/dp/B0FDB74W9H?ref_=Oct_d_obs_d_26389385031_0&pd_rd_w=uVBxv&content-id=amzn1.sym.a03c59ad-4247-4645-9aa2-b2c6679c3cac&pf_rd_p=a03c59ad-4247-4645-9aa2-b2c6679c3cac&pf_rd_r=926MSE7C010T3MWBMJCP&pd_rd_wg=bfEz2&pd_rd_r=b81fb790-f337-4d42-932f-1365fd37c5bc&pd_rd_i=B0FDB74W9H&th=1",
      },
       {
        title: " حقيبة ظهر FASHION عصرية مضادة للسرقة متعدد الالوان ",
         price: "9 ريال",
        image: "https://cdn.salla.sa/XnEj/b8c44af5-0acd-440d-a3e2-4ac202477e3a-1000x1000-7LbXb8CsyvHm6MlntIKOMfdbCG2hblrznHjoPPPL.jpg",
        url: "https://iblackstores.com/DpeNvnY",
      },
    ],
    ae: [
      {
        title: "جوغر بقصة واسعة مطبع بكتابة",
        price: "25 درهم",
        image: "https://f.nooncdn.com/p/pzsku/Z7398083D99F0DE4A4F90Z/45/1741263201/1873c96b-385c-4e41-a768-b3740a527db6.jpg?width=800",
        url: "https://www.noon.com/uae-ar/slogan-print-oversized-fit-jogger-with-slip-pocket/Z7398083D99F0DE4A4F90Z/p/?o=z7398083d99f0de4a4f90z-3&shareId=5145fb64-18f1-4295-a36a-a94de9cd46d2",
      },
      {
        title: " آيفون 16 برو ماكس من أبل (256 جيجابايت) مزود بخدمة فيس تايم لون تيتانيوم صحراوي إصدار الشرق الأوسط",
        price: "4475 درهم",
        image: "https://pimcdn.sharafdg.com/cdn-cgi/image/width=600,height=600,fit=pad,format=webp,quality=70/images/iphone_16_pro_max_desert_titanium_1?1761653713?g=0",
        url: "https://uae.sharafdg.com/ar/product/apple-iphone-16-pro-max-256gb-desert-titanium/?promo=3525334&dg=false",
      },
      {
        title: "انكر باور بانك، شاحن محمول فائق السرعة 25,000 مللي أمبير في الساعة 165 واط لأجهزة اللابتوب المزدوجة، حزمة بطارية شحن سريع مع كيبلات مدمجة وقابلة للسحب، لسلسلة آيفون 17/16، سامسونج، وأكثر",
        price: "329 درهم",
        image: "https://m.media-amazon.com/images/I/61CxDvB+76L._AC_SY300_SX300_QL70_ML2_.jpg",
        url: "https://www.amazon.ae/%D8%A7%D9%86%D9%83%D8%B1-%D8%A7%D9%84%D8%B3%D8%B1%D8%B9%D8%A9-%D8%A7%D9%84%D9%84%D8%A7%D8%A8%D8%AA%D9%88%D8%A8-%D8%A7%D9%84%D9%85%D8%B2%D8%AF%D9%88%D8%AC%D8%A9%D8%8C-%D8%B3%D8%A7%D9%85%D8%B3%D9%88%D9%86%D8%AC%D8%8C/dp/B0DCBB2YTR/ref=sr_1_1_sspa?dib=eyJ2IjoiMSJ9.lHbLA0UqdkQK2AP6m8d-pL5ENGUW-5GkP6kbZEca9gszZnrR3Nei8Hvt7Gbl9dTs7HodzTfnTKtOrZ1z9QpPEOGOgv8ZkSM3vwlDDWTJe_dQzn1WaLNjJZrKQU6usYGnYy3MQHGjcB-t3Q7renBAHG9pCJVEnY6D38se1Pmraj56MQxiDywOIjvhtmt_Oe70HdFRtHnttLMQNZu4e-1fRCCqAL-1OuyuCeDRY5ftinfcUrBkWes4NeNiMunvBBw_TDRgQVnEPh5SnbmLonj-OwLEy7GS8ZGhUIH3EKTp-kw.gCKCJB5np1v1yeef7XSC7s09slT3U3wel6Skow5_le8&dib_tag=se&keywords=power%2Bbank&qid=1778356027&sr=8-1-spons&aref=d1K7xJs6Ow&sp_csd=d2lkZ2V0TmFtZT1zcF9hdGY&th=1",
      },
      {
        title: "    ماك بوك برو M5 الجديد 2025 MDE04 لابتوب بشاشة ريتينا XDR مقاس 14 بوصة، شريحة M5 مع معالج 10 نواة، معالج رسومي 10 نواة/ 16 جيجابايت ذاكرة عشوائية/ 512 جيجابايت SSD/ ماك أو إس/ نسخة دولية",
        price: "5819 درهم",
        image: "https://f.nooncdn.com/p/pnsku/N70248386V/45/_/1764242114/a46b0fdb-72db-4bc1-a5aa-569022495a78.jpg?width=800",
        url: "https://www.noon.com/uae-ar/macbook-pro-mde04-14-inch-display-apple-m5-chip-10-core-cpu-and-10-core-gpu-16gb-ram-512gb-ssd-macos-english-keyboard-international-version-english-space-black/N70248386V/p/?o=d90a817a02a43f5a&shareId=07f73e94-5f58-4a86-9fec-c9643c289725",
      },
      {
        title: "صندوق الهدايا وايت",
        price: "470 درهم",
        image: "https://emiratespride.com/ae/wp-content/uploads/sites/10/2023/10/White-gift-set-scaled.webp",
        url: "https://emiratespride.com/ae/caballo-white-gift-set/?lang=ar",
      },
       {
        title: "مجفف ومصفف متعدد الاستخدامات Airwrap Co-anda2x - مستقيم + مموج (وردي سيراميك / ذهب وردي)",
        price: "2199 درهم",
        image: "https://f.nooncdn.com/p/pnsku/N70270683V/45/_/1766474451/2107bb28-eebf-45bb-a921-730459a31860.jpg?width=800",
        url: "https://www.noon.com/uae-ar/airwrap-co-anda2x-multi-styler-and-dryer-straight-wavy-ceramic-pink-rose-gold-ceramic-pink-rose-gold/N70270683V/p/?o=edae37f8bec648ab&shareId=d6641fc8-6fbe-45e0-bcb9-11c249f11047",
      },
      {
        title: "سماعة رأس كلاود II سلكية للألعاب بتصميم يغطي الأذن لأجهزة بلايستيشن 4 وبلايستيشن 5 وإكس بوكس ون وإكس بوكس سيريس إكس ونينتندو سويتش/ جهاز الكمبيوتر",
        price: "178 درهم",
        image: "https://f.nooncdn.com/p/pnsku/N16659460A/45/_/1766380489/5451288e-47f9-4bac-9a0f-8aba6f0ecce2.jpg?width=800",
        url: "https://www.noon.com/uae-ar/cloud-ii-gaming-headset-for-pc-and-ps4-and-xbox-one-nintendo-switch-red-wired-black/N16659460A/p/?o=fc7125647a74078c&shareId=f16f063c-1e28-4b7b-b155-d8e17decbf58",
      },
      {
        title: "إصدار قرص وحدة تحكم PlayStation 5 Slim مع وحدة تحكم - موديل جديد 2023 (الإصدار الدولي)",
        price: "2399 درهم",
        image: "https://f.nooncdn.com/p/pnsku/N70022609V/45/_/1777031875/250d2a92-7d57-4cea-981a-a1cdb471e921.jpg?width=800",
        url: "https://www.noon.com/uae-ar/playstation-5-slim-console-international-version-disc-version-with-controller-new-model-2023/N70022609V/p/?o=ea15ab4f06975d3f&shareId=3cff6abe-0cb8-4e84-8a99-c1d1eeb9fb0f",
      },
   
    ],
    kw: [
      {
        title: "هودي واسع من صوف نادي الأطفال",
        price: "9.05 دينار",
        image: "https://f.nooncdn.com/p/pzsku/Z85EF322A6C8511C91CFAZ/45/_/1774982460/8c221dd8-085e-4d3c-be4f-2eedc303772c.jpg?width=800",
        url: "https://www.noon.com/kuwait-ar/kids-nsw-club-fleece-oversized-hoodie/Z85EF322A6C8511C91CFAZ/p/?o=ade024beedf5d61e&shareId=5a41a8c3-8406-4d35-9ae9-c9482accc147",
      },
      {
        title: "أبل أيفون 15 128 جيجا (1 شريحة نانو + 1 شريحة الكترونية) - أسود",
        price: "199.99 دينار",
        image: "https://mrflex.best.com.kw/medias/1200Wx1200H-null?context=bWFzdGVyfGltYWdlc3w5OTg3NHxpbWFnZS9qcGVnfGFHUTFMMmc1TlM4eE16UXhNekF6TnpZd05EZzVOQzh4TWpBd1YzZ3hNakF3U0Y5dWRXeHN8ZDYxN2E4ZWU2Yjc2MWRkYmM4MzA3OTBkZDJiY2JhNzAzYzQ5OTllMDM3ZWJjNWQzMTZjZTExY2I1MzIyYWE5Nw",
        url: "https://best.com.kw/ar/product/IPH-15-128GB-BK-ES/Apple-iPhone-15-128GB-1-Nano-Sim---1-ESim----Black-",
      },
      {
        title: "Nintendo Switch 2 Console - Black",
        price: "159.900 دينار",
        image: "https://www.blink.com.kw/cdn/shop/files/ca16f863-76cc-4119-9742-646bcbbca066.jpg?v=1748414660&width=500",
        url: "https://www.blink.com.kw/products/nintendo-switch-2-console-black",
      },
      {
        title: "The Legend of Zelda: Breath of the Wild for Nintendo Switch",
        price: "20.900 دينار",
        image: "https://www.blink.com.kw/cdn/shop/files/TheLegendofZeldaBreathoftheWildGameforNintendoSwitch.jpg?v=1714218015&width=720",
        url: "https://www.blink.com.kw/products/the-legend-of-zelda-breath-of-the-wild-game-for-nintendo-switch",
      },
      {
        title: "آيفون 16 برو ماكس سعة 256 جيجابايت تيتانيوم صحراوي 5G مع فيس تايم - نسخة الشرق الأوسط",
        price: "373.68 دينار",
        image: "https://f.nooncdn.com/p/pnsku/N70105592V/45/_/1764242077/4f0a3f7d-0382-4715-9b34-9e6a5181c151.jpg?width=800",
        url: "https://www.noon.com/kuwait-ar/iphone-16-pro-max-256gb-desert-titanium-5g-with-facetime-middle-east-version/N70105592V/p/?o=fb39500b277647ba&shareId=caa595b5-64ac-42e2-b507-916cd8a92faa",
      },
      {
        title: "ساعة جالكسي ووتش ألترا 2025 47 مم (نسخة KSA) ساعة ذكية LTE، سعة 64 جيجابايت، هيكل تيتانيوم متين، تصميم مريح، زر سريع، مراقبة صحية مدعومة بالذكاء الاصطناعي",
        price: "115.91 دينار",
        image: "https://f.nooncdn.com/p/pzsku/Z6052E4EA21F11AED8370Z/45/_/1772091081/c063307d-7cc3-4b48-95fc-e4cb7ef2f88d.jpg?width=800",
        url: "https://www.noon.com/kuwait-ar/galaxy-watch-ultra-2025-47mm-ksa-version-lte-smartwatch-64gb-storage-durable-titanium-casing-cushion-design-quick-button-al-powered-health-monitoring-titanium-blue-titanium-blue/N70189415V/p/?o=ee5ec472f4cc99ea&shareId=e737b9bc-b769-43ee-af73-f5d9fef8e515",
      },
    ],
    qa: [
       {
        title: "Apple iPhone 17 Pro Max",
        price: "5699 ريال قطري",
        image: "https://www.jarir.com/cdn-cgi/image/fit=contain,width=380,height=380,quality=100,metadata=none/https://ak-asset.jarir.com/akeneo-prod/asset/f/6/1/6/f616275d795b31c691907e198bc253ad9eda247c_666736.jpg",
        url: "https://www.jarir.com/sa-en/apple-iphone-17-pro-max-smartphones-jpm1725.html?childSku=666736",
      },
      {
        title: "كاميرا روبوت EBO SE FamilyBot من Enabot / دقة 1080P / مع بث مباشر و تنبيهات حركة / تحكم من الجوال",
        price: "519 ريال قطري",
        image: "https://d1auy89oi7zwzb.cloudfront.net/media/catalog/product/a17637e5-9703-4cf4-8978-f55f6c0534d5",
        url: "https://nologystore.com/ar/products/enabot-ebo-se",
      },
      {
        title: "كينوود شواية كهربائية صحية معدنية أتش جي أم 80, لون فضي",
        price: "359 ريال قطري",
        image: "https://fnac.qa/media/catalog/product/t/e/te0185611-1.jpg?width=700&height=560&canvas=700,560&quality=80&bg-color=255,255,255&fit=bounds",
        url: "https://fnac.qa/arabic/kenwood-grill-hgm80-000ss-2000-watts-high-power-for-quick-heating.html",
      },
      {
        title: "ديلونجي ماكينة تحضير القهوة الباردة لا سبيسياليستا أرتي إيفو غي سي9255, لون معدني",
        price: "2429 ريال قطري",
        image: "https://fnac.qa/media/catalog/product/T/E/TE0211864-1.jpg?width=700&height=560&canvas=700,560&quality=80&bg-color=255,255,255&fit=bounds",
        url: "https://fnac.qa/arabic/delonghi-cold-brew-coffee-machine-la-specialista-arte-evo-with-cold-extraction-technology-ec9255-m-silver.html",
      },
      {
        title: "عطر كلاسيك بلاك EDT للرجال 100ملليلتر",
        price: "35.38 ريال قطري",
        image: "https://f.nooncdn.com/p/pnsku/N11200839A/45/_/1767607727/222d1a49-e55a-4772-8720-6873aa564798.jpg?width=800",
        url: "https://www.noon.com/qatar-ar/classic-black-edt-for-men-100ml/N11200839A/p/?o=ffcb8bcef1561cba&shareId=638e129d-9a0b-4853-b509-352fa76272a4",
      },
       {
        title: "ميزان ذكي C1 بتقنية البلوتوث",
        price: "58.38 ريال قطري",
        image: "https://f.nooncdn.com/p/pnsku/N33949658A/45/_/1766380652/7fe14545-62bc-47e6-b330-0536b270d212.jpg?width=800",
        url: "https://www.noon.com/qatar-ar/eufy-smart-scale-c1-with-bluetooth-body-fat-scale-wireless-digital-bathroom-scale-15-measurements-weight-body-fat-bmi-fitness-body-composition-analysis-black-lbs-kg/N33949658A/p/?o=f6f385c674ce061f&shareId=eb77f557-6cdb-4f53-be35-0fb137b028c1",
      },
       {
        title: "ساعات ذكية للنساء والرجال، جهاز تتبع اللياقة البدنية على شكل دائري مقاس 1.43 بوصة",
        price: "107.04 ريال قطري",
        image: "https://f.nooncdn.com/p/pzsku/ZB95FA0B89C3312271FC5Z/45/_/1689304111/a6032ed6-5584-4f38-8db8-0df2445b03a2.jpg?width=800",
        url: "https://www.noon.com/qatar-ar/smart-watches-for-women-men-answer-make-calls-1-43-round-fitness-tracker-smartwatch-with-heart-rate-monitor-sleep-ip68-waterproof-blood-oxygen-glucose-blood-pressure/ZB95FA0B89C3312271FC5Z/p/?o=zb95fa0b89c3312271fc5z-1&shareId=b1a680bd-d484-42e5-b6c2-4b402e75e95e",
      },
    ],
    bh: [
      {
        title: "جهاز تشغيل بطارية اس 8 اير محمول من استرو ايه اي، 2000 امبير لسيارات البنزين 6.0 لتر والديزل 3.0 لتر، مزود بضاغط هواء لاسلكي 10.54 كجم/ متر مربع، وظيفة إيقاف تلقائي، علبة شحن بطارية 12 فولت، (برتقالي) للهدايا",
        price: "20.89 دينار بحريني",
        image: "https://f.nooncdn.com/p/pzsku/ZBDC300D0B33CD1983D18Z/45/1756363829/6e267e44-2a37-44f0-88a5-f2e25a5402a7.jpg?width=800",
        url: "https://www.noon.com/bahrain-ar/astroai-s8-air-jump-starter-with-air-compressor-1500a-car-battery-jumper-starter-portable-6-0-gas-3-0l-diesel-with-150psi-cordless-auto-shutoff-tire-inflator-12v-battery-charger-booster-orange-for-gifts/ZBDC300D0B33CD1983D18Z/p/?o=zbdc300d0b33cd1983d18z-1&shareId=3b12695c-481b-41a9-a2fa-b4c36286cbaa",
      },
      {
        title: "آيفون 17 برو ماكس 256 جيجابايت فضي 5G (eSim فقط) مع فيس تايم - النسخة الدولية",
        price: "600.36 دينار بحريني",
        image: "https://f.nooncdn.com/p/pnsku/N70211464V/45/_/1758629382/5c58a74c-4536-4fe3-9d97-bc4644900c71.jpg?width=800",
        url: "https://www.noon.com/bahrain-ar/iphone-17-pro-max-256-gb-silver-5g-esim-only-with-facetime-international-version/N70211464V/p/?o=ea54e62e4951725c&shareId=8b342c40-8b2c-4c2b-a1eb-e3247bca93b7",
      },
        {
        title: "حقيبة ظهر للأطفال بطبعة سبايدرمان مقاس 12 بوصة أحمر وأسود",
        price: "4.10 دينار بحريني",
        image: "https://f.nooncdn.com/p/pnsku/N39595192A/45/_/1764242402/68ff2253-1b98-4134-82e3-61e4feffdd6a.jpg?width=800",
        url: "https://www.noon.com/bahrain-ar/kids-spiderman-printed-backpack-12-inch-red-black/N39595192A/p/?o=fb6e224d8ecf876c&shareId=7891f970-97e8-435e-90c9-c2259c17ccf4",
      },
      {
        title: "Little Doll Stuffed Animal kids Plush Backpack, Lovely Toddler Backpack, Cartoon Preschool Purse for Kids, Suitable for 2-6 Years Girl Boy (Pink)",
        price: "5.62 دينار بحريني",
        image: "https://f.nooncdn.com/p/pzsku/ZCB9BED7D1066BC084795Z/45/_/1727184626/545f879b-44e1-467d-b0cc-abfbf0c6a0d7.jpg?width=800",
        url: "https://www.noon.com/bahrain-ar/little-doll-stuffed-animal-kids-plush-backpack-lovely-toddler-backpack-cartoon-preschool-purse-for-kids-suitable-for-2-6-years-girl-boy-pink/ZCB9BED7D1066BC084795Z/p/?o=zcb9bed7d1066bc084795z-1&shareId=433467d5-8248-4185-ac6a-a8aac99cdbe6",
      },
      {
        title: "كارلينكيت ليد كاربلاي أندرويد 13 4 جيجابايت + 64 جيجابايت/8 جيجابايت + 128 جيجابايت أنظمة ذكية المحيطة أيبوكس كسم 6225 اللاسلكية أندرويد السيارات اللاسلكية كاربلاي يوتيوب نيتفليكس 4 جرام لت ل 98% سيارات مازدا تويوتا هيونداي أودي",
        price: "51.91 دينار بحريني",
        image: "https://f.nooncdn.com/p/pzsku/Z891D0581C939C62F1C31Z/45/1764833767/711b0974-6f65-43a9-9288-d0cdf3daa7d1.jpg?width=800",
        url: "https://www.noon.com/bahrain-ar/carlinkit-led-carplay-android-13-4gb-64gb-8gb-128gb-smart-systems-ambient-aibox-qcm6225-wireless-android-auto-wireless-carplay-youtube-netflix-4g-lte-for-98-cars-mazda-toyota-hyundai-audi/Z891D0581C939C62F1C31Z/p/?o=z891d0581c939c62f1c31z-1&shareId=3d36fd60-cb01-408b-ac70-cff1698f1d7f",
      },
      {
        title: "HUAWEI MateBook D Laptop",
        price: "299.99 دينار بحريني",
        image: "https://www.jarir.com/cdn-cgi/image/fit=contain,width=380,height=380,quality=100,metadata=none/https://ak-asset.jarir.com/akeneo-prod/asset/7/b/f/c/7bfce0a92fc9c40f887f32d5fc68795458b3c2f5_674467.jpg",
        url: "https://www.jarir.com/bh-en/huawei-matebook-d-laptops-jpm1620.html?childSku=674467&_gl=1%2a1pugrzk%2a_up%2aMQ..%2a_ga%2aNDIyOTcxNDAzLjE3Nzg0MDYzNjY.%2a_ga_738MLQYL5R%2aczE3Nzg0MDYzNjQkbzEkZzAkdDE3Nzg0MDYzNjQkajYwJGwwJGgw",
      },
    ],
    eg: [
      {
        title: "جراب حماية شفاف متوافق مع اوبو A80 الجيل الخامس 5G رفيع من البولي يوريثين الحراري وسادة هوائية [ليس السهل اصفرار] موبايل مضاد للصدمات -",
        price: "130 جنيه",
        image: "https://m.media-amazon.com/images/I/61MQTOcxMnL._AC_SX522_.jpg",
        url: "https://www.amazon.eg/%D9%85%D8%AA%D9%88%D8%A7%D9%81%D9%82-%D8%A7%D9%84%D8%AE%D8%A7%D9%85%D8%B3-%D9%8A%D9%88%D8%B1%D9%8A%D8%AB%D9%8A%D9%86-%D8%A7%D9%84%D8%AD%D8%B1%D8%A7%D8%B1%D9%8A-%D9%84%D9%84%D8%B5%D8%AF%D9%85%D8%A7%D8%AA/dp/B0DP5S4NSW/ref=sr_1_1_sspa?dib=eyJ2IjoiMSJ9.Kwz9kc6Ri8ZNb_bWqN89r65P5rZdAyXyRaXHol8ioawFDHykmJG7L39ibIyogl0qBV9mWhPe0wV7g39U-9t-X15YkepweoYWKS9i4D2U3IpfTFDdUPkAtM7U2w7Y4gnjOWO_elYqmF1lm2rqRGeAeLAVSCNOhoRfUdF1pvSBAOYgPpgEXjoBMi33nJ7DO2K_85QyJEYEhsa-vEgGGeyfzNvPGR7xLAcsnCgRJSDIyJ6Sllb9Y666MlhCG332j2nR-_pxFFe4rfVwBcOXAQKIrBxphPphgINpQhUZPUvdMxM.q_S0BocLkAv_5tAWy2AQ9vo5_IPQlq_B9HIbTFOZOzE&dib_tag=se&keywords=%D9%85%D9%88%D8%A8%D8%A7%D9%8A%D9%84%D8%A7%D8%AA+%D8%A7%D9%88%D8%A8%D9%88&qid=1778411708&sr=8-1-spons&aref=lobOJeotQI&sp_csd=d2lkZ2V0TmFtZT1zcF9hdGY&psc=1",
      },
      {
        title: "لعبة موبايل سمارت للأطفال والبنات من ايرتيو بكاميرا مزدوجة من 3-7 سنوات، لعبة موبايل تعليمية للأطفال الصغار، لعبة للسفر بمشغل موسيقى ام بي 3 لهدايا عيد الميلاد للأطفال 3 4 5 6 7 سنوات (وردي 1)",
        price: "1699 جنيه",
        image: "https://m.media-amazon.com/images/I/615ZG73Fu1L._AC_SY300_SX300_QL70_ML2_.jpg",
        url: "https://www.amazon.eg/dp/B0CB3TPMZG/ref=sspa_dk_detail_1?pd_rd_i=B0CB3TPMZG&pd_rd_w=jobqu&content-id=amzn1.sym.cff944a5-bd3e-4c58-b6ed-070b8d5fd086&pf_rd_p=cff944a5-bd3e-4c58-b6ed-070b8d5fd086&pf_rd_r=CPKWGCHCKTT29VP934GT&pd_rd_wg=MOfpg&pd_rd_r=81d30e78-7da5-4673-b466-c75c512baa18&aref=iaLtrGBCaZ&sp_csd=d2lkZ2V0TmFtZT1zcF9kZXRhaWw&th=1",
      },
      {
        title: "بونيه نوم ساتان من قماش ناعم فاخر، مقاس لارج، لون عشوائي من فيتيلي",
        price: "65 جنيه",
        image: "https://m.media-amazon.com/images/I/51AHErvrO5L._AC_SX679_.jpg",
        url: "https://www.amazon.eg/%D8%A8%D9%88%D9%86%D9%8A%D9%87-%D8%B3%D8%A7%D8%AA%D8%A7%D9%86-%D9%81%D8%A7%D8%AE%D8%B1%D8%8C-%D8%B9%D8%B4%D9%88%D8%A7%D8%A6%D9%8A-%D9%81%D9%8A%D8%AA%D9%8A%D9%84%D9%8A/dp/B0DKC5YZL1/ref=lp_18018165031_1_5?pf_rd_p=78aae7d6-8af7-4452-9c4f-e424a540062d&pf_rd_r=GSAYAZX9REV4E3RGCZBX",
      },
      {
        title: "طقم شرابات ليكرا للرجال سادة من دايس، 3 أزواج",
        price: "89 جنيه",
        image: "https://m.media-amazon.com/images/I/71T8OzvE0SL._AC_SX679_.jpg",
        url: "https://www.amazon.eg/%D8%B4%D8%B1%D8%A7%D8%A8%D8%A7%D8%AA-%D9%84%D9%8A%D9%83%D8%B1%D8%A7-%D9%84%D9%84%D8%B1%D8%AC%D8%A7%D9%84-%D9%85%D8%AC%D9%85%D9%88%D8%B9%D8%A9-%D9%85%D8%AA%D9%86%D9%88%D8%B9%D8%A9/dp/B0BXJL1SM9/ref=lp_18018165031_1_7?pf_rd_p=78aae7d6-8af7-4452-9c4f-e424a540062d&pf_rd_r=GSAYAZX9REV4E3RGCZBX&th=1&psc=1",
      },
      {
        title: "OPPO هاتف A6 Pro ثنائي الشريحة 4G سعة 256 جيجابايت/8 جيجابايت - أزرق نجمي",
        price: "15299 جنيه",
        image: "https://eg.jumia.is/unsafe/fit-in/680x680/filters:fill(white)/product/54/6648331/1.jpg?3766",
        url: "https://www.jumia.com.eg/ar/oppo-a6-pro-dual-sim-4g-256gb8gb-stellar-blue-133846645.html",
      },
      {
        title: "Step2 مركز لعب مائي ورملي متنقل على شكل شاحنة",
        price: "8100 جنيه",
        image: "https://eg.jumia.is/unsafe/fit-in/680x680/filters:fill(white)/product/40/6995331/1.jpg?6191",
        url: "https://www.jumia.com.eg/ar/step2-mobile-sand-water-play-center-in-the-shape-of-a-truck-133599604.html",
      },
       {
        title: "Wintouch بوصة 7 أندرويد للأطفال 1 جيجابايت + 16 جيجابايت واي فاي رباعي النواة أندرويد تابلت لوحي منتجات تعليمية للأطفال تابلت تعليمي للاطفال-بدون شريحة",
        price: "2299 جنيه",
        image: "https://eg.jumia.is/unsafe/fit-in/680x680/filters:fill(white)/product/63/0984431/1.jpg?0599",
        url: "https://www.jumia.com.eg/ar/wintouch-7-inch-android-kids-tablet-1gb-16gb-wi-fi-quad-core-educational-product-for-children-without-a-chip-134489036.html",
      },
       {
        title: "حزام قناع شد الوجه على شكل حرف V: قناع شد الوجه على شكل حرف V قابل لإعادة الاستخدام - حزام شد الوجه للنساء (وردي)",
        price: "175 جنيه",
        image: "https://eg.jumia.is/unsafe/fit-in/680x680/filters:fill(white)/product/46/8433431/1.jpg?5936",
        url: "https://www.jumia.com.eg/ar/generic-v-line-lifting-mask-strap-reusable-v-line-lifting-mask-face-lift-belt-for-women-pink-134334864.html",
      },
    ],
  };

  const ads = adsByCountry[country] || [];

  async function handleSearch() {
  if (loading) return;

  setLoading(true);

  try {

    const res = await fetch("/api/search", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: query.trim() === "" ? "*" : query,
        country: country,
      }),
    });

    const data = await res.json();

    console.log("API RESULT:", data);

    setResults(data?.value || data?.products || data || []);
  } catch (err) {
    console.error("Search error:", err);
    setResults([]);
  } finally {
    setLoading(false);
  }
}

  return (
    <div className="page">
    {/* AI Animated Background */}
  <div className="aiBackground">
    <div className="brainCore"></div>

    <div className="grid"></div>

    <div className="particles">
      {Array.from({ length: 35 }).map((_, i) => (
        <span
  key={i}
  style={
    {
      "--i": i,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
    } as React.CSSProperties
  }
/>
      ))}
    </div>
  </div>
      <button className="menuButton" onClick={() => setMenuOpen(true)}>
  ☰
</button>

{menuOpen && <div className="overlay" onClick={() => setMenuOpen(false)} />}

<aside className={`sidebar ${menuOpen ? "open" : ""}`}>
  <div className="sidebarHeader">
    <strong>BPS Chat</strong>
    <button className="closeButton" onClick={() => setMenuOpen(false)}>
      ×
    </button>
  </div>

  {user ? (
  <div className="menuItem" style={{ cursor: "default", opacity: 0.9 }}>
    👤 {user.email.split("@")[0]}
  </div>
) : (
  <a href="/login" className="menuItem">تسجيل الدخول</a>
)}
<a href="/advertise" className="menuItem">أعلن معنا</a>
<a href="/about" className="menuItem">عن الموقع</a>
<a href="/contact" className="menuItem">تواصل معنا</a>
{user && (
  <button
    className="menuItem"
    onClick={async () => {
      await supabase.auth.signOut();
      setUser(null);
    }}
  >
    تسجيل الخروج
  </button>
)}
</aside>
      <main className="container">
       <section className="hero">
  
  <div className="badge">Best Product Search AI www.bps.com</div>
  <h1 className="titleWithLogo">
  <img src="/logo-icon.png" className="inlineLogo leftLogo" />
  <span className="typingText">
    best Product Search chat V:1.1.6
  </span>
  <img src="/logo-icon.png" className="inlineLogo rightLogo" />
</h1>
  <p className="subtitle">ابحث عن المنتجات حسب الدولة</p>
</section>

        {/* 🔥 Ads Slider */}
        <div className="adsWrapper" ref={sliderRef}>
          {ads.map((ad: any, i: number) => (
            <a
              key={i}
              href={ad.url}
              target="_blank"
              rel="noopener noreferrer"
              className="adCard"
            >
             <img src={ad.image} className="adImage" alt={ad.title} />

<div className="adInfo">
  <div className="adTitle">{ad.title}</div>

  {ad.price && (
    <div className="adPrice">{ad.price}</div>
  )}

  <div className="adFooter">
    <span className="adTag">إعلان</span>
  </div>
</div>
            </a>
          ))}
        </div>

        <section className="composer">
          <select
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className="select"
          >
            <option value="sa">السعودية</option>
            <option value="ae">الإمارات</option>
            <option value="kw">الكويت</option>
            <option value="qa">قطر</option>
            <option value="bh">البحرين</option>
            <option value="eg">مصر</option>
          </select>

          <div className="searchBox">
            <input
              placeholder="اكتب اسم المنتج..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSearch();
                }
              }}
              className="input"
            />

            <button onClick={handleSearch} className="button" disabled={loading}>
              {loading ? "..." : "بحث"}
            </button>
          </div>
        </section>

        <section className="results">
  {loading && (
    <div className="aiLoading">
      <div className="aiSpinner"></div>

      <p className="aiText">
        جاري الحصول على أفضل نتائج ...
      </p>
    </div>
  )}

          {!loading && results.length === 0 && (
            <p className="empty">ابدأ البحث أو جرّب اسم منتج آخر</p>
          )}

          {!loading &&
            results.map((item, i) => {
              const data = item as any;

              return (
                <article key={i} className="card">
                  <img
                    src={data.image}
                    className="image"
                    alt={data.title || data.name || "Product image"}
                  />

                  <div className="info">
                    <div className="name">
                      {data.title || data.name || "No title"}
                    </div>

                    <div className="meta">
                      <span>💰 {data.priceText || "No price"}</span>
                      <span>🏬 {data.store || "Unknown store"}</span>
                    </div>

                    <a
                      href={data.url || "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link"
                    >
                      عرض المنتج ↗
                    </a>
                  </div>
                </article>
              );
            })}
        </section>
        <PopularSearches />
      </main>

<style jsx>{`
.page {
  min-height: 100vh;
  background:
    radial-gradient(circle at top, rgba(0,255,200,0.08), transparent 30%),
    radial-gradient(circle at right, rgba(0,180,255,0.07), transparent 25%),
    #0b0f14;

  color: #ececec;

  position: relative;
  overflow-x: hidden;
}
.adPrice {
  color: #10a37f;
  font-weight: bold;
  font-size: 16px;
  margin-top: 4px;
}
/* 🔥 Title */
.titleWithLogo {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  font-size: 30px;
  margin: 10px 0;
}
  /* ✍️ Typing (مظبوط من غير ما يبوّظ العرض) */
.typingText {
  display: inline-block;
  overflow: hidden;
  white-space: nowrap;
  
  padding-right: 5px;
  animation: typing 2.5s steps(30, end) forwards, blink 0.8s infinite;
}

@keyframes typing {
  from { width: 0 }
  to { width: 100% }
}

@keyframes blink {
  50% { border-color: transparent }
}
/* 🤖 Logo base */
.inlineLogo {
  width: 38px;
  height: 38px;
  object-fit: contain;
}

/* 👈 الشمال يهتز */
.leftLogo {
  animation: logoWave 2.5s ease-in-out infinite;
  transform-origin: bottom center;
}

/* 👉 اليمين حركة خفيفة مختلفة */
.rightLogo {
  animation: logoFloat 3s ease-in-out infinite;
}

/* 🔄 حركة الشمال */
@keyframes logoWave {
  0%, 100% { transform: rotate(0deg) translateY(0) }
  20% { transform: rotate(-8deg) translateY(-2px) }
  40% { transform: rotate(8deg) translateY(-2px) }
  60% { transform: rotate(-5deg) }
  80% { transform: rotate(5deg) }
}

/* 🔄 حركة اليمين */
@keyframes logoFloat {
  0%, 100% { transform: translateY(0) }
  50% { transform: translateY(-4px) }
}



/* 📦 Container */
.container {
  position: relative;
  z-index: 2;

  max-width: 900px;
  margin: auto;
  padding: 40px 16px;
}
.hero {
  text-align: center;

  position: relative;
  z-index: 3;
}
  .hero::before {
  content: "";
  position: absolute;

  top: -120px;
  left: 50%;

  transform: translateX(-50%);

  width: 900px;
  height: 500px;

  background:
    radial-gradient(
      circle,
      rgba(0,255,200,0.28),
      rgba(0,180,255,0.10),
      transparent 70%
    );

  filter: blur(40px);

  z-index: -1;

  animation: heroGlow 6s ease-in-out infinite;
}
  @keyframes heroGlow {

  0%,100% {
    opacity: 0.22;
    transform: translateX(-50%) scale(1);
  }

  50% {
    opacity: 1;
    transform: translateX(-50%) scale(1.08);
  }
}

.badge {
  background: #2f2f2f;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 12px;
  color: #aaa;
}

/* 🍔 Menu */
.menuButton {
  position: fixed;
  top: 76px;
  left: 18px;
  z-index: 50;
  width: 42px;
  height: 42px;
  border: 1px solid #3a3a3a;
  border-radius: 12px;
  background: #2f2f2f;
  color: #ffffff;
  font-size: 22px;
  cursor: pointer;
}
.menuButton:hover {
  background: #383838;
}

.overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  z-index: 60;
}

.sidebar {
  position: fixed;
  top: 0;
  left: -280px;
  width: 260px;
  height: 100vh;
  background: #171717;
  border-right: 1px solid #2f2f2f;
  z-index: 70;
  padding: 18px;
  transition: left 0.25s ease;
}

.sidebar.open {
  left: 0;
}

.sidebarHeader {
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: white;
  margin-bottom: 22px;
  font-size: 18px;
}

.closeButton {
  background: transparent;
  border: none;
  color: #ececec;
  font-size: 28px;
  cursor: pointer;
}

.menuItem {
  display: block;
  padding: 13px 12px;
  margin-bottom: 8px;
  border-radius: 12px;

  color: #ffffff !important;

  text-decoration: none;
}
.menuItem:hover {
  background: #2f2f2f;
}

@media (max-width: 600px) {
  .menuButton {
    display: none;
  }

  .sidebar {
    width: 82%;
    left: -85%;
  }

  .sidebar.open {
    left: 0;
  }

  .sidebar a,
  .sidebar .menuItem {
    color: #ffffff !important;
  }
}
/* 🧾 Text */
.title {
  font-size: 32px;
  margin: 10px 0;
}

.subtitle {
  color: #aaa;
}

.adsWrapper {
  display: flex;
  gap: 16px;
  overflow-x: auto;
  padding: 12px 6px 18px;
  margin: 22px 0;
  scroll-behavior: smooth;
  scrollbar-width: thin;
  scrollbar-color: #10a37f #2f2f2f;
}

.adsWrapper::-webkit-scrollbar {
  height: 6px;
}

.adsWrapper::-webkit-scrollbar-track {
  background: #2f2f2f;
  border-radius: 999px;
}

.adsWrapper::-webkit-scrollbar-thumb {
  background: #10a37f;
  border-radius: 999px;
}
.adCard {
  min-width: 230px;
  background: #2f2f2f;
  border-radius: 16px;
  overflow: hidden;
  text-decoration: none;
  color: white;
  position: relative;
  transition: all 0.25s ease;
  border: 1px solid #3a3a3a;
}

/* ✨ hover احترافي */
.adCard:hover {
  transform: translateY(-6px) scale(1.02);
  border-color: #10a37f;
  box-shadow: 0 10px 30px rgba(16, 163, 127, 0.2);
}

.adImage {
  width: 100%;
  height: 130px;
  object-fit: contain;
  background: #fff;
}
  .adCard::before {
  content: "";
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    120deg,
    transparent,
    rgba(255, 255, 255, 0.15),
    transparent
  );
  transition: 0.6s;
}

.adCard:hover::before {
  left: 100%;
}

.adInfo {
  padding: 10px;
}

.adTitle {
  font-size: 14px;
  margin-bottom: 4px;
}

.adTag {
  font-size: 12px;
  color: #10a37f;
}

/* 🔥 Composer */
.composer {
  position: sticky;
  top: 0;
  background: #212121;
  padding: 10px 0;
}

.select {
  display: block;
  margin: auto;
  margin-bottom: 10px;
  padding: 10px;
  border-radius: 10px;
  background: #2f2f2f;
  color: white;
}

/* 🔥 SEARCH (FINAL FIX) */
.searchBox {
  display: flex;
  align-items: center;
  gap: 10px;
  justify-content: center;
  width: 100%;
  max-width: 600px;
  margin: 15px auto;
}

.input {
  flex: 1;
  height: 46px;
  padding: 0 14px;
  border-radius: 14px;
  background: #2f2f2f;
  border: 1px solid #444;
  color: white;
  outline: none;
  font-size: 14px;
}

.input::placeholder {
  color: #9b9b9b;
}

.input:focus {
  border-color: #10a37f;
}

.button {
  height: 46px;
  background: #10a37f;
  border: none;
  padding: 0 18px;
  border-radius: 14px;
  color: white;
  font-weight: 600;
  cursor: pointer;
}

.button:hover {
  background: #0e8f6e;
}

/* 📦 Results */
.results {
  margin-top: 20px;
}

.card {
  display: flex;
  gap: 10px;
  padding: 10px;
  background: rgba(40,40,40,0.72);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255,255,255,0.06);
  border-radius: 12px;
  margin-bottom: 10px;

  transition: all 0.25s ease;
}

.card:hover {
  transform: translateY(-3px);
  border-color: rgba(0,255,200,0.35);
  box-shadow:
    0 0 18px rgba(0,255,200,0.18),
    0 10px 30px rgba(0,0,0,0.25);
}
.image {
  width: 80px;
  height: 80px;
  border-radius: 10px;
}

.name {
  font-weight: bold;
}

.meta {
  font-size: 14px;
}

.link {
  color: #10a37f;
}

.loadingCard {
  text-align: center;
}

.empty {
  text-align: center;
}
  /* 🤖 AI BACKGROUND */

.aiBackground {
  position: fixed;
  inset: 0;
  z-index: 1;
  overflow: hidden;
  pointer-events: none;
}

/* 🧠 Brain glow */
.brainCore {
  position: absolute;
  top: 10%;
  left: 50%;
  transform: translateX(-50%);
  width: 700px;
  height: 450px;

  border-radius: 50%;

  background:
    radial-gradient(circle at 30% 40%, rgba(0,255,200,1), transparent 10%),
    radial-gradient(circle at 50% 50%, rgba(0,180,255,0.9), transparent 12%),
    radial-gradient(circle at 70% 45%, rgba(16,163,127,1), transparent 10%),
    radial-gradient(circle at 45% 70%, rgba(0,220,255,0.9), transparent 8%);

  filter: blur(35px);

  opacity: 0.22;

  animation: brainPulse 6s ease-in-out infinite;

  box-shadow:
    0 0 120px rgba(0,255,200,0.35),
    0 0 220px rgba(0,180,255,0.25);
}

/* 🌐 Grid */
.grid {
  position: absolute;
  inset: 0;

  background-image:
    linear-gradient(rgba(0,255,200,0.08) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0,255,200,0.08) 1px, transparent 1px);

  background-size: 50px 50px;

  opacity: 0.22;

  animation: gridMove 20s linear infinite;
}
/* ✨ particles */
.particles span {
  position: absolute;
  width: 5px;
  height: 5px;

  border-radius: 50%;

  background: #00f7ff;

  box-shadow:
    0 0 8px #00f7ff,
    0 0 18px #00f7ff,
    0 0 35px rgba(0,247,255,0.8);

  opacity: 0.7;

  animation:
    floatParticle 8s ease-in-out infinite,
    particleGlow 2.5s ease-in-out infinite;
}

.particles span:nth-child(odd) {
  background: #00bfff;

  box-shadow:
    0 0 12px #00bfff,
    0 0 24px #00bfff;
}

/* 📍 positions */

.particles span:nth-child(1){top:10%;left:15%;}
.particles span:nth-child(2){top:18%;left:75%;}
.particles span:nth-child(3){top:35%;left:22%;}
.particles span:nth-child(4){top:42%;left:82%;}
.particles span:nth-child(5){top:58%;left:12%;}
.particles span:nth-child(6){top:66%;left:72%;}
.particles span:nth-child(7){top:78%;left:30%;}
.particles span:nth-child(8){top:84%;left:55%;}

.particles span:nth-child(n) {
  animation-delay: calc(var(--i) * 0.2s);
}

/* ✨ animations */

@keyframes brainPulse {
  0%,100% {
    transform: translateX(-50%) scale(1);
    opacity: 0.22;
  }

  50% {
    transform: translateX(-50%) scale(1.06);
    opacity: 0.42;
  }
}

@keyframes gridMove {
  from {
    background-position: 0 0;
  }

  to {
    background-position: 120px 120px;
  }
}

@keyframes floatParticle {

  0%,100% {
    transform: translateY(0px) scale(1);
    opacity: 0.3;
  }

  50% {
    transform: translateY(-25px) scale(1.8);
    opacity: 1;
  }
}

@keyframes particleGlow {

  0%,100% {
    opacity: 0.4;
    transform: scale(1);
  }

  50% {
    opacity: 1;
    transform: scale(1.8);
  }
}
  .aiLoading {
  margin-top: 30px;

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;

  animation: fadeIn 0.4s ease;
}

.aiSpinner {
  width: 80px;
  height: 80px;

  border-radius: 50%;

  border: 2px solid rgba(255,255,255,0.08);
  border-top: 2px solid #00ffd0;

  box-shadow:
    0 0 20px rgba(0,255,208,0.35),
    inset 0 0 20px rgba(0,255,208,0.15);

  animation:
    spinAI 1s linear infinite,
    pulseAI 2s ease-in-out infinite;
}

.aiText {
  color: #cfcfcf;
  font-size: 15px;
  letter-spacing: 1px;

  animation: textGlow 2s ease-in-out infinite;
}

@keyframes spinAI {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}

@keyframes pulseAI {

  0%,100% {
    box-shadow:
      0 0 20px rgba(0,255,208,0.25),
      inset 0 0 20px rgba(0,255,208,0.1);
  }

  50% {
    box-shadow:
      0 0 45px rgba(0,255,208,0.5),
      inset 0 0 30px rgba(0,255,208,0.25);
  }
}

@keyframes textGlow {

  0%,100% {
    opacity: 0.7;
  }

  50% {
    opacity: 1;
  }
}

@keyframes fadeIn {

  from {
    opacity: 0;
    transform: translateY(10px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}
`}</style>
    </div>
  );
}