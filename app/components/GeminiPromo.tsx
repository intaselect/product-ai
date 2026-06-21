"use client";
import React from "react";

export default function GeminiPromo() {
  const whatsappNumber = "966564911912";
  const message = encodeURIComponent("أريد تفعيل اشتراك جيميناي برو السنوي");
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`;

  return (
    <div className="w-full max-w-[1180px] mx-auto my-8 px-4" dir="rtl">
      {/* البانر الخارجي مع تأثير هوفر ثلاثي الأبعاد ووميض خارجي */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#1a73e8] via-[#7a22ff] to-[#e84118] p-[2px] shadow-2xl transition-all duration-500 hover:shadow-[0_0_30px_rgba(122,34,255,0.3)] hover:-translate-y-1">
        
        {/* خلفية تقنية متحركة خفيفة */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(26,115,232,0.15),transparent)] animate-pulse" />

        {/* المحتوى الداخلي باللون النيلي الفاخر الخاص بجيميناي */}
        <div className="relative rounded-[14px] bg-[#0f141c] p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* الجانب الأيمن: شعار جيميناي والنصوص */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-right gap-5 flex-1">
            
            {/* شعار جيميناي الرسمي (أيقونة النجمة الرباعية المضيئة) مرسومة بـ SVG مع أنيميشن وميض دوري */}
            <div className="relative flex-shrink-0 w-16 h-16 bg-[#1e293b] rounded-2xl flex items-center justify-center border border-slate-700 shadow-inner group">
              <svg className="w-12 h-12 animate-[spin_8s_linear_infinite]" viewBox="0 0 24 24" fill="none">
                <path 
                  d="M12 2c0 5.523 4.477 10 10 10-5.523 0-10 4.477-10 10 0-5.523-4.477-10-10-10 4.477 0 10-4.477 10-10z" 
                  fill="url(#geminiGradient)"
                />
                <defs>
                  <linearGradient id="geminiGradient" x1="2" y1="2" x2="22" y2="22" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#9bc5ff" />
                    <stop offset="50%" stopColor="#2b66ff" />
                    <stop offset="100%" stopColor="#ff85b8" />
                  </linearGradient>
                </defs>
              </svg>
              {/* شارة الذكاء الاصطناعي الفائقة */}
              <span className="absolute -bottom-2 bg-gradient-to-r from-[#2b66ff] to-[#ff85b8] text-white text-[9px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider border border-[#0f141c]">
                AI PRO
              </span>
            </div>

            {/* نصوص العرض والأسعار */}
            <div className="space-y-2">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                <span className="bg-gradient-to-r from-[#7a22ff] to-[#1a73e8] text-white text-[11px] font-bold px-2.5 py-1 rounded-md tracking-wide">
                  أقوى أدوات الذكاء الاصطناعي ⚡
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-slate-300">
                  تفعيل اشتراك جيميناي برو السنوي (Gemini Advanced)
                </h3>
              </div>
              
              <p className="text-slate-400 text-sm max-w-xl leading-relaxed">
                امتلك مساعدك الذكي الخارق بموديل <span className="text-[#9bc5ff] font-bold">Gemini 1.5 Pro</span> لإنتاج الأكواد، كتابة المحتوى وتحليل الملفات الضخمة لمدة <span className="text-white font-semibold">سنة كاملة</span>. التفعيل آمن تماماً على <span className="text-[#ff85b8] font-bold">إيميلك الشخصي</span> وبضمان شامل من <span className="text-amber-400 font-medium underline decoration-dotted">منصة BPS Chat</span>.
              </p>
              
              {/* الأسعار بالعملات الثلاث */}
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 pt-2 text-xs sm:text-sm text-slate-300">
                <div className="bg-[#1e293b]/60 px-3 py-1.5 rounded-xl border border-slate-800">
                  🇪🇬 مصر: <strong className="text-[#9bc5ff] text-sm sm:text-base">900 ج.م</strong>
                </div>
                <div className="bg-[#1e293b]/60 px-3 py-1.5 rounded-xl border border-slate-800">
                  🇸🇦 السعودية: <strong className="text-[#9bc5ff] text-sm sm:text-base">68 ريال</strong>
                </div>
                <div className="bg-[#1e293b]/60 px-3 py-1.5 rounded-xl border border-slate-800">
                  🇦🇪 الإمارات: <strong className="text-[#9bc5ff] text-sm sm:text-base">66 درهم</strong>
                </div>
              </div>
            </div>
          </div>

          {/* الجانب الأيسر: زر التواصل للواتساب المصمم بهوية زرقاء تقنية */}
          <div className="flex-shrink-0 w-full md:w-auto text-center">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 w-full md:w-auto px-8 py-4 bg-gradient-to-r from-[#2b66ff] to-[#1a73e8] hover:from-[#1a73e8] hover:to-[#2b66ff] text-white font-bold text-lg rounded-xl shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 transition-all duration-300 hover:scale-[1.03] group"
            >
              <svg className="w-6 h-6 animate-bounce" viewBox="0 0 24 24" fill="currentColor">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.517 2.266 2.27 3.51 5.28 3.505 8.484-.01 6.657-5.347 11.996-11.957 11.996-.2.001-.4-.001-.6-.006l-.597.057c-2.004-.001-3.978-.512-5.733-1.483L0 24zm6.17-3.461c1.674.993 3.336 1.517 5.226 1.518 5.485.001 9.948-4.415 9.953-9.855.002-2.636-1.02-5.115-2.881-6.98C16.658 3.355 14.186 2.33 11.55 2.33c-5.487 0-9.952 4.414-9.957 9.853-.002 1.93.52 3.81 1.51 5.495L2.146 21.67l4.081-1.131z" />
              </svg>
              <span>احصل عليه عبر الواتساب</span>
            </a>
          </div>

        </div>
      </div>
    </div>
  );
}