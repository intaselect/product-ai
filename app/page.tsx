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
  const [errorMessage, setErrorMessage] = useState("");
  const [remainingSearches, setRemainingSearches] = useState(10);
  const [isMobile, setIsMobile] = useState(false);
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
useEffect(() => {
  const checkMobile = () => {
    setIsMobile(window.innerWidth <= 600);
  };

  checkMobile();
  window.addEventListener("resize", checkMobile);

  return () => {
    window.removeEventListener("resize", checkMobile);
  };
}, []);
  // 🔥 Ads حسب الدولة
  const adsByCountry: any = {
    sa: [
         {
         title: "  القطاعة الكهربائية الأكبر حجماً لتقطيع وبشر الجبن والخضروات والفواكة متعددة الإستخدامات بضمان عامين(هديه نظف الفوم العجيب لجميع الاسطح 500 مللي)",
          price: "122 ريال",
        image: "https://media.taager.com/ab1343cd-3161-41d1-bb3b-5893d5816353.jpg",
        url: "https://307116.dukan.shop/products/4a88321ad0644326a629e30b73686c93",
      },
      
      {
        title: "كرسي استرخاء وهزاز للأطفال 3 وضعيات مع ألعاب معلقة – حتى 18 كجم",
         price: "150 ريال",
        image: "https://media.taager.com/e155e27e-6b9a-4b15-9b08-5007da43e8e1.png",
        url: "https://307116.dukan.shop/products/a4648afbb15f43c798f4036359849b90",
      },
      {
        title: "   كاميرا رقمية جديدة G6 Mini HD  ",
         price: "140 ريال",
        image: "https://media.taager.com/2b5ffb16-600e-4132-b47d-40c94e853dfd.jpg",
        url: "https://307116.dukan.shop/products/32951d27240b4ad7afc12261847b14c7",
      },
      {
        title: " حقيبة خصر رياضية للجنسين، حامل نقود وهاتف ",
         price: "80 ريال",
        image: "https://media.taager.com/cfe906d1-b22f-4160-bd67-ca9a3d0228a5.jpg",
        url: "https://307116.dukan.shop/products/e8b53b6a7e824709995d2b5445fb9dc7",
      },
      {
        title: "  خلاط محمول العملى + صانع مكعبات الثلج من السيليكون",
         price: "110 ريال",
        image: "https://media.taager.com/bb1cdece-612b-4f63-bab9-0f5a644476a3.jpg",
        url: "https://307116.dukan.shop/products/f12fd4ce57f14b7a981f780d674a294f",
      },
      {
        title: " ماكينة الجيب لازالة الشعر",
         price: "75 ريال",
        image: "https://media.taager.com/95520243-457e-4f4a-b1d9-953700437d56.png",
        url: "https://307116.dukan.shop/products/7639045dd6f64738ab2f576397bc29c4",
      },
       {
        title: " موقد غاز بقوة 2000 واط محمول للرحلات والكشتات",
         price: "160 ريال",
        image: "https://media.taager.com/a139dc90-e7fe-4807-ac03-8cb2a7beda19.jpg",
        url: "https://307116.dukan.shop/products/76364b5a715745beb42aae9a2116911d",
      },
    ],
    ae: [
      {
        title: "مسدس الغسيل بالفوم الرهيب - 2 بطارية",
        price: "70 درهم",
        image: "https://media.taager.com/d0c32403-0e2b-4555-84cc-786468039e43.jpg",
        url: "https://damenkom-orders.com?id=0bb70a39-58d2-414e-9ca0-0ebf05b73658",
      },
      {
        title: " جهاز التحصين والقراءان الكريم كاملا",
        price: "75 درهم",
        image: "https://media.taager.com/5e09097e-23f7-4825-86cf-f92eb086f505.jpg",
        url: "https://damenkom-orders.com?id=59fa1d13-b7b7-4b21-a13e-6d341cf17aef",
      },
      {
        title: "هاتف Sumax Air 5G - ضمان 6 شهور",
        price: "175 درهم",
        image: "https://media.taager.com/9868677b-c0fe-4917-87be-abd4e184dcd1.jpg",
        url: "https://damenkom-orders.com?id=b28a782c-4d8e-4c4c-878d-218595f5f0aa",
      },
      {
        title: " جهاز تدليك الكتف والرقبة N7",
        price: "135 درهم",
        image: "https://media.taager.com/fc4e4747-c5bf-458f-a5d0-8f38b71712f0.jpg",
        url: "https://damenkom-orders.com?id=fb69c699-ae36-4b36-be2e-1b62faa6a0d6",
      },
      {
        title: "سواچ إيموجي - 60 سم",
        price: "105 درهم",
        image: "https://media.taager.com/61e5b79e-1d0d-41c7-adb0-b72713c9198b.jpg",
        url: "https://damenkom-orders.com?id=1829f747-c85c-4213-a9af-91f82b63afc1",
      },
       {
        title: "عرض 3 قطع جهاز طارد للحشرات و الباعوض و الذباب و الفئران بالموجات فوق صوتيه",
        price: "45 درهم",
        image: "https://media.taager.com/32b297f3-7f48-4ab1-9ef7-338274468ff6.jpg",
        url: "https://damenkom-orders.com?id=290ac70a-1efe-4863-b4b6-4264afe4d1fc",
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
        title: "DSP سكين الايرو",
        price: "200 جنيه",
        image: "https://media.taager.com/4494d9c5-2809-4d41-9d15-258d428a812c.jpg",
        url: "https://damenkom-orders.com?id=35f500e9-9cc5-41ad-b6e1-47a559176077",
      },
      {
        title: "فرشاة SK خمسه في واحد 1400 وات",
        price: "1400 جنيه",
        image: "https://media.taager.com/caaa09cb-3f9b-4e60-85fb-008d4668e6fd.jpg",
        url: "https://damenkom-orders.com?id=f48dedfe-f3d4-4127-970d-c97c45c66e69",
      },
      {
        title: "مكواة شعر 15062-SK بضمان سنة",
        price: "620 جنيه",
        image: "https://media.taager.com/72ec18a2-1040-491c-89f1-034d8ed5ef9a.jpg",
        url: "https://damenkom-orders.com?id=c85e539d-7555-4037-9a88-b5ff59bfba91",
      },
      {
        title: "Samsung F9 Pro Plus",
        price: "500 جنيه",
        image: "https://media.taager.com/0377225e-3ec0-46b0-96e3-49cf8c39c176.jpg",
        url: "https://damenkom-orders.com?id=c97e4b00-135a-4a45-adab-4e39bd2cb604",
      },
      {
        title: "كاميرا مايكرو ميني الحديثه",
        price: "1110 جنيه",
        image: "https://eg.jumia.is/unsafe/fit-in/680x680/filters:fill(white)/product/54/6648331/1.jpg?3766",
        url: "https://damenkom-orders.com?id=3630eb78-18ac-473a-ab7e-0a2ae539fd6e",
      },
      {
        title: "ساعة سمارت هواوي ميرور اورجينال -Smart watch Huawei Mirror original",
        price: "1200 جنيه",
        image: "https://media.taager.com/3d17d4f2-d5ff-4603-b923-4630db66d9c7.jpg",
        url: "https://damenkom-orders.com?id=b45dd05b-0885-4779-a45b-23092c1b7e9c",
      },
       {
        title: "طيارة سبورت للتحكم بريموت و سينسور",
        price: "189 جنيه",
        image: "https://media.taager.com/724a86f5-74a9-454f-a9e9-c85350d009df.jpg",
        url: "https://damenkom-orders.com?id=82c06dd5-e051-4184-85d7-ab19e67972e1",
      },
       {
        title: "مكينه القهوه المحموله الحديثه الترند",
        price: "520 جنيه",
        image: "https://media.taager.com/d1cf8ae9-4ffb-456d-9aa1-2d984d03ec61.webp",
        url: "https://damenkom-orders.com?id=9a58880c-c0ff-4387-9f82-560ed2f8982b",
      },
    ],
  };

  const ads = adsByCountry[country] || [];
function getVisitorId() {
  let id = localStorage.getItem("bps_visitor_id");

  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem("bps_visitor_id", id);
  }

  return id;
}
  async function handleSearch() {
  if (loading) return;

  setLoading(true);

  try {

    const res = await fetch("/api/search", {
      method: "POST",
     headers: {
  "Content-Type": "application/json",
  "x-bps-visitor-id": getVisitorId(),
  "x-bps-user-email": user?.email || "",
},
      body: JSON.stringify({
        query: query.trim() === "" ? "*" : query,
        country: country,
      }),
    });

    const data = await res.json();
    if (typeof data.remainingSearches === "number") {
  setRemainingSearches(data.remainingSearches);
}
    if (data.blocked) {
  setErrorMessage(data.message);
  setLoading(false);
  return;
}

    console.log("API RESULT:", data);

    setResults(data?.value || data?.products || data || []);
    setErrorMessage("");
  } catch (err) {
    console.error("Search error:", err);
    setResults([]);
  } finally {
    setLoading(false);
  }
}

  return (
  <div className="page">
    {/* AI Animated Background - Desktop only */}
    {!isMobile && (
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
    )}

    <button className="menuButton" onClick={() => setMenuOpen(true)}>
      ☰
    </button>

{menuOpen && <div className="overlay" onClick={() => setMenuOpen(false)} />}

<aside className={`sidebar ${menuOpen ? "open" : ""}`}>
  <div className="sidebarHeader">
    <strong>
  BPS Chat
  <span className="arabicName">بي بي اس شات</span>
</strong>
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
<a href="/advertise" className="menuItem sidebarAdvertiseGlow">
  🚀 أعلن معنا
</a>
<a href="/customer-offers/dashboard" className="menuItem sidebarSellerDashboardGlow">
  👤 صفحة البائعين
</a>
<a href="/smart-search" className="menuItem sidebarSmartGlow">
  ⚡ البحث الذكي
</a>

<a href="/seller-tools" className="menuItem sidebarSellerGlow">
  📝 أدوات البائع
</a>
<a href="/customer-offers" className="menuItem sidebarCustomerStoreGlow">
  🛒 متجر عملاء بي بي اس
  <span className="subText">بيع واشتري</span>
</a>
<a href="/about" className="menuItem">عن الموقع</a>
<a href="/contact" className="menuItem">تواصل معنا</a>
<a href="/privacy" className="menuItem">سياسة الخصوصية</a>
<a href="/terms" className="menuItem">الشروط والأحكام</a>

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
  
  <div className="badge">BPS Chat | بي بي اس شات</div>
  <div className="brandTitleBlock">
  <h1 className="titleWithLogo">
    <img src="/logo-icon.png" className="inlineLogo leftLogo" />

    <span className="typingText">
      BPS Chat
    </span>

    <img src="/logo-icon.png" className="inlineLogo rightLogo" />
  </h1>

  <div className="arabicBrandName">
    بي بي اس شات
  </div>
</div>
  <p className="subtitle">ابحث عن المنتجات حسب الدولة</p>
</section>
<a href="/customer-offers" className="liveStorePulse">
  <span className="liveDot"></span>
  مئات المستخدمين يكتشفون عروض BPS Chat
  <span className="aiSpark">AI</span>
</a>

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
          {errorMessage && (
  <div className="aiErrorBox">
    {errorMessage}
  </div>
)}
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
            <option value="iq">العراق</option> 
<option value="om">عُمان</option>  
          </select>
<div className="dailyLimitNotice">
  ⚡ لكل مستخدم 10 عمليات بحث يوميًا لضمان أفضل أداء للموقع
</div>
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

          <div className="searchActions">
  <button onClick={handleSearch} className="button" disabled={loading}>
    {loading ? "..." : "بحث"}
  </button>

  <div className={`searchCounter ${remainingSearches <= 3 ? "danger" : ""}`}>
    {remainingSearches} / 10
  </div>
</div>
          </div>
        </section>
        <section className="smartSearchPromo">
  <div>
    <strong>⚡ البحث الذكي حسب الميزانية</strong>
    <p>اختار المنتج والدولة والميزانية، وخلّي BPS Chat يرشح لك نتائج مناسبة.</p>
  </div>

  <a href="/smart-search">جرّب البحث الذكي</a>
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
       
  <section className="storePromo">
  <div className="storePromoContent">
    <div>
      <h3>🛒 متجر عملاء بي بي اس</h3>
      <p>
        ✅ منتجات مختارة ومعتمدة من BPS Chat — تسوّق بثقة أو ابدأ بيع منتجاتك مجانًا
      </p>
    </div>

    <div className="storePromoActions">
      <a href="/customer-offers" className="storeBtn primary">
        تسوّق الآن
      </a>

      <a href="/customer-offers/dashboard" className="storeBtn secondary">
        اعرض منتجك
      </a>
    </div>
  </div>
</section>
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
  .searchActions {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
 
}
  .liveStorePulse {
  position: relative;
  z-index: 4;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  max-width: 620px;
  margin: 18px auto 10px;
  padding: 14px 18px;
  border-radius: 999px;
  text-decoration: none;
  color: #fff;
  font-weight: 900;
  font-size: 15px;
  background:
    linear-gradient(135deg, rgba(16,163,127,0.28), rgba(0,180,255,0.18)),
    rgba(255,255,255,0.05);
  border: 1px solid rgba(0,255,200,0.28);
  box-shadow:
    0 0 22px rgba(0,255,200,0.18),
    inset 0 0 14px rgba(255,255,255,0.04);
  overflow: hidden;
  transition: all .25s ease;
  animation: livePulse 2.4s ease-in-out infinite;
}

.liveStorePulse::before {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(120deg, transparent, rgba(255,255,255,0.18), transparent);
  transform: translateX(110%);
  animation: liveShine 3s ease-in-out infinite;
}

.liveStorePulse:hover {
  transform: translateY(-3px) scale(1.02);
  border-color: rgba(0,255,200,0.55);
  box-shadow:
    0 0 34px rgba(0,255,200,0.30),
    0 0 55px rgba(0,180,255,0.16);
}

.liveDot {
  width: 10px;
  height: 10px;
  border-radius: 999px;
  background: #22c55e;
  box-shadow: 0 0 14px rgba(34,197,94,0.9);
  animation: dotBlink 1.2s ease-in-out infinite;
}

.aiSpark {
  padding: 4px 8px;
  border-radius: 999px;
  background: rgba(0,255,200,0.14);
  color: #00ffd5;
  font-size: 11px;
  border: 1px solid rgba(0,255,200,0.25);
}

@keyframes livePulse {
  0%, 100% { box-shadow: 0 0 22px rgba(0,255,200,0.18); }
  50% { box-shadow: 0 0 36px rgba(0,255,200,0.32); }
}

@keyframes liveShine {
  0% { transform: translateX(110%); }
  45%, 100% { transform: translateX(-110%); }
}

@keyframes dotBlink {
  0%, 100% { opacity: .45; transform: scale(.9); }
  50% { opacity: 1; transform: scale(1.25); }
}
  .sidebarSellerDashboardGlow {
  background: linear-gradient(135deg, rgba(124,58,237,0.22), rgba(37,99,235,0.18));
  border: 1px solid rgba(124,58,237,0.35);
  color: #fff;
  font-weight: 900;
  transition: all 0.25s ease;
}

.sidebarSellerDashboardGlow:hover {
  transform: translateX(-5px) scale(1.02);
  box-shadow: 0 0 28px rgba(124,58,237,0.35);
}
.sidebarCustomerStoreGlow {
  position: relative;
  background: linear-gradient(135deg, rgba(34,197,94,0.18), rgba(59,130,246,0.15));
  border: 1px solid rgba(34,197,94,0.35);
  color: #fff;
  font-weight: 900;
  overflow: hidden;
  transition: all 0.25s ease;
}

/* glow متحرك */
.sidebarCustomerStoreGlow::after {
  content: "";
  position: absolute;
  inset: -1px;
  background: linear-gradient(120deg, transparent, rgba(34,197,94,0.6), transparent);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.sidebarCustomerStoreGlow:hover::after {
  opacity: 1;
}

/* hover حركة */
.sidebarCustomerStoreGlow:hover {
  transform: translateX(-5px) scale(1.02);
  box-shadow: 0 0 28px rgba(34,197,94,0.35);
}

/* النص الصغير */
.subText {
  display: block;
  font-size: 11px;
  color: #cfcfcf;
  margin-top: 3px;
  font-weight: 600;
}
  .storePromo {
  margin-top: 25px;
  padding: 20px;
  border-radius: 16px;

  background: linear-gradient(135deg, rgba(34,197,94,0.12), rgba(59,130,246,0.08));
  border: 1px solid rgba(34,197,94,0.25);

  backdrop-filter: blur(10px);
}

.storePromoContent {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 15px;
  flex-wrap: wrap;
}

.storePromo h3 {
  margin: 0;
  font-size: 18px;
}

.storePromo p {
  margin: 5px 0 0;
  font-size: 13px;
  color: #ccc;
}

.storePromoActions {
  display: flex;
  gap: 10px;
}

.storeBtn {
  padding: 8px 14px;
  border-radius: 999px;
  text-decoration: none;
  font-weight: bold;
  font-size: 13px;
  transition: all 0.25s ease;
}

.storeBtn.primary {
  background: #22c55e;
  color: white;
}

.storeBtn.secondary {
  background: transparent;
  border: 1px solid #22c55e;
  color: #22c55e;
}

.storeBtn:hover {
  transform: scale(1.05);
}
.searchCounter {
  min-width: 70px;
  text-align: center;
  padding: 8px 12px;
  border-radius: 12px;

  font-size: 13px;
  font-weight: bold;

  background: linear-gradient(135deg, rgba(0,255,200,0.15), rgba(0,180,255,0.15));
  border: 1px solid rgba(0,255,200,0.3);

  color: #00ffd0;

  box-shadow:
    0 0 12px rgba(0,255,200,0.25),
    inset 0 0 6px rgba(0,255,200,0.08);

  backdrop-filter: blur(6px);
}
  .searchCounter.danger {
  color: #ff4d4d;
  border-color: rgba(255,0,0,0.4);
  box-shadow:
    0 0 12px rgba(255,0,0,0.3),
    inset 0 0 6px rgba(255,0,0,0.1);
}
  
  .dailyLimitNotice {
  margin-bottom: 12px;
  text-align: center;
  font-size: 13px;
  color: #00ffd5;

  background: linear-gradient(135deg, rgba(0,255,200,0.12), rgba(0,180,255,0.12));
  border: 1px solid rgba(0,255,200,0.25);

  padding: 10px 14px;
  border-radius: 999px;

  box-shadow:
    0 0 12px rgba(0,255,200,0.2),
    inset 0 0 10px rgba(0,255,200,0.05);

  backdrop-filter: blur(6px);
}
  .brandTitleBlock {
  text-align: center;
  margin: 10px 0;
}
.aiErrorBox {
  margin: 12px auto;
  padding: 12px 16px;
  max-width: 500px;

  border-radius: 16px;

  background:
    linear-gradient(135deg, rgba(255,0,0,0.18), rgba(255,100,100,0.08)),
    rgba(255,255,255,0.05);

  border: 1px solid rgba(255,80,80,0.35);

  color: #ffb3b3;
  text-align: center;
  font-size: 14px;

  box-shadow:
    0 0 18px rgba(255,80,80,0.15),
    inset 0 0 12px rgba(255,255,255,0.04);

  animation: errorGlow 2s ease-in-out infinite;
}

@keyframes errorGlow {
  0%,100% { opacity: 0.7 }
  50% { opacity: 1 }
}
.arabicBrandName {
  display: block;
  text-align: center;
  font-size: 18px; /* 👈 بدل 22 */
  font-weight: 600; /* 👈 أخف شوية */
  color: #cfcfcf; /* 👈 أهدى */
  opacity: 0.9;
  margin-top: 4px;
  letter-spacing: 0.5px;
    text-shadow: 0 0 10px rgba(0,255,200,0.15);

}
  .arabicName {
  display: block;
  width: 100%;
  text-align: center;
  font-size: 14px;
  opacity: 0.7;
  margin-top: 6px;
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
  gap: 14px;
  font-size: 34px;
  margin: 10px 0 0;
}
  /* ✍️ Typing (مظبوط من غير ما يبوّظ العرض) */
.typingText {
  display: inline-block;
  overflow: hidden;
  white-space: nowrap;

  padding-right: 5px;
  max-width: 100%;

  animation: typing 2.5s steps(30, end) forwards;
}

@keyframes typing {
  from { width: 0 }
  to { width: 100% }
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
  .sidebarAdvertiseGlow {
  color: #fff !important;
  background: rgba(16, 163, 127, 0.18);
  border: 1px solid rgba(0,255,200,0.25);

  animation: sidebarAdPulse 2.2s ease-in-out infinite;
}
  .sidebarSmartGlow {
  color: #fff !important;
  background: rgba(37, 99, 235, 0.18);
  border: 1px solid rgba(0,180,255,0.35);
  animation: sidebarSmartPulse 2.2s ease-in-out infinite;
}

@keyframes sidebarSmartPulse {
  0%,100% {
    transform: scale(1);
    box-shadow:
      0 0 6px rgba(37,99,235,0.25),
      0 0 12px rgba(0,180,255,0.12);
  }

  50% {
    transform: scale(1.05);
    box-shadow:
      0 0 18px rgba(37,99,235,0.60),
      0 0 40px rgba(0,180,255,0.35);
  }
}

@keyframes sidebarAdPulse {
  0%,100% {
    transform: scale(1);
    box-shadow:
      0 0 6px rgba(16,163,127,0.25),
      0 0 12px rgba(0,255,200,0.10);
  }

  50% {
    transform: scale(1.05);
    box-shadow:
      0 0 18px rgba(16,163,127,0.60),
      0 0 40px rgba(0,255,200,0.35);
  }
}
@media (max-width: 600px) {
  .menuButton {
    display: block;
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
z-index: 3;
  min-width: 230px;
  background: rgba(40,40,40,0.72);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255,255,255,0.06);
  border-radius: 16px;
  overflow: hidden;
  text-decoration: none;
  color: white;
  position: relative;
  transition: all 0.25s ease;
}

.adCard:hover {
  transform: translateY(-6px) scale(1.02);
  border-color: rgba(0,255,200,0.35);
  box-shadow:
    0 0 22px rgba(0,255,200,0.20),
    0 12px 32px rgba(0,0,0,0.28);
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

  pointer-events: none;

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

.composer {
  position: sticky;
  top: 0;

  background: rgba(255,255,255,0.05);
  backdrop-filter: blur(12px);

  border: 1px solid rgba(255,255,255,0.12);
  border-radius: 22px;

  padding: 20px;
  margin-top: 20px;

  box-shadow: 0 18px 50px rgba(0,0,0,0.25);
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

.searchBox {
  display: flex;
  align-items: center;
  gap: 10px;

  width: 100%;
  max-width: 670px;
  margin: 15px auto;

  background: rgba(255,255,255,0.04);
  border-radius: 16px;
  padding: 6px;
}
.input {
  flex: 1;
  height: 46px;
  padding: 0 16px;

  border-radius: 14px;

  background: transparent; /* 🔥 أهم تعديل */
  border: none;            /* 🔥 أهم تعديل */

  color: white;
  outline: none;
  font-size: 15px;
}

.input::placeholder {
  color: #9fb3c8;
}

.input::placeholder {
  color: #9b9b9b;
}

.input:focus {
  border-color: #10a37f;
}

.button {
  height: 46px;

  background: linear-gradient(135deg, #10a37f, #18d6a3);
  border: none;

  padding: 0 18px;
  border-radius: 14px;

  color: #06110e;
  font-weight: 900;

  cursor: pointer;
}


.button:hover {
  filter: brightness(1.1);
}
.button:hover {
  background: #0e8f6e;
}
.composer::before {
  content: "";
  position: absolute;
  inset: 0;

  background:
    radial-gradient(circle at top, rgba(16,163,127,0.15), transparent 60%);

  border-radius: 22px;
  z-index: -1;
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
  .smartSearchPromo {
  margin: 18px auto 10px;
  padding: 16px;
  max-width: 650px;
  border-radius: 18px;
  background:
    radial-gradient(circle at top, rgba(37,99,235,0.18), transparent 60%),
    rgba(255,255,255,0.06);
  border: 1px solid rgba(0,180,255,0.25);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 14px;
  box-shadow: 0 0 28px rgba(0,180,255,0.12);
}

.smartSearchPromo strong {
  color: #fff;
  font-size: 17px;
}

.smartSearchPromo p {
  margin: 6px 0 0;
  color: #aaa;
  font-size: 14px;
  line-height: 1.7;
}

.smartSearchPromo a {
  background: linear-gradient(135deg, #2563eb, #10a37f);
  color: white;
  text-decoration: none;
  border-radius: 14px;
  padding: 11px 15px;
  font-weight: bold;
  white-space: nowrap;
}

@media (max-width: 650px) {
  .smartSearchPromo {
    flex-direction: column;
    text-align: center;
  }
}
  .sidebarSellerGlow {
  color: #fff !important;
  background: linear-gradient(135deg, rgba(16,163,127,0.2), rgba(0,180,255,0.12));
  border: 1px solid rgba(16,163,127,0.35);

  animation: sellerPulse 2.5s ease-in-out infinite;
}

@keyframes sellerPulse {
  0%,100% {
    transform: scale(1);
    box-shadow:
      0 0 8px rgba(16,163,127,0.3),
      0 0 18px rgba(0,180,255,0.15);
  }

  50% {
    transform: scale(1.06);
    box-shadow:
      0 0 22px rgba(16,163,127,0.7),
      0 0 45px rgba(0,180,255,0.25);
  }
}
  @media (max-width: 600px) {
  .composer {
    padding: 16px 12px;
    margin: 16px 10px 0;
    border-radius: 20px;
  }

  .dailyLimitNotice {
    font-size: 11px;
    line-height: 1.7;
    padding: 9px 10px;
    border-radius: 14px;
    margin-bottom: 12px;
  }

  .searchBox {
    flex-direction: column;
    align-items: stretch;
    gap: 10px;
    max-width: 100%;
    padding: 10px;
  }

  .input {
    width: 100%;
    height: 44px;
    text-align: right;
    font-size: 14px;
  }

  .searchActions {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr auto;
    gap: 8px;
  }

  .button {
    width: 100%;
    height: 44px;
    padding: 0 14px;
  }

  .searchCounter {
    min-width: 56px;
    height: 44px;
    padding: 0 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    border-radius: 13px;
    white-space: nowrap;
  }

  .aiErrorBox {
    max-width: 100%;
    font-size: 12px; 
    line-height: 1.7;
    padding: 10px 12px;
    margin: 10px auto 12px;
  }
}
  @media (max-width: 600px) {
  .searchBox {
    flex-direction: column;
    align-items: stretch;
    gap: 10px;
    padding: 12px;
  }

  .input {
    width: 100%;
    height: 46px;
    background: rgba(255,255,255,0.08);
    border: 1px solid rgba(0,255,200,0.22);
    border-radius: 14px;
    padding: 0 14px;
    box-shadow:
      inset 0 0 10px rgba(0,255,200,0.06),
      0 0 10px rgba(0,255,200,0.08);
  }

  .input:focus {
    border-color: rgba(0,255,200,0.55);
    box-shadow:
      0 0 0 3px rgba(0,255,200,0.12),
      inset 0 0 10px rgba(0,255,200,0.08);
  }

  .searchActions {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr auto;
    gap: 8px;
  }
}
  @media (max-width: 600px) {
  .searchBox {
    padding: 16px;
  }

  .input {
    height: 64px;
    font-size: 16px;
  }

  .button {
    height: 56px;
  }
  @media (max-width: 600px) {
  .searchBox {
    max-width: 100%;
    padding: 0 8px;
  }

  .input {
    padding: 18px 16px;
    font-size: 17px;
  }
}
}
}
@media (max-width: 600px) {

  /* ❌ إلغاء الخلفية والأنيميشن */
  .aiBackground,
  .particles,
  .particles span,
  .brainCore,
  .grid {
    display: none !important;
  }

  /* ❌ إلغاء أي glow من الهيرو */
  .hero::before {
    display: none !important;
    animation: none !important;
  }

  /* 📱 تحسينات الموبايل */
  .menuButton {
    display: block;
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

  .composer {
    padding: 16px 12px;
    margin: 16px 10px 0;
    border-radius: 20px;
  }

  .searchBox {
    flex-direction: column;
    align-items: stretch;
    gap: 10px;
    padding: 12px;
  }

  /* 💥 أهم سطر (لو النقط لسه موجودة) */
  span[style*="--i"] {
    display: none !important;
  }
}
`}</style>
    </div>
  );
}