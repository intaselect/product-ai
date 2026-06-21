"use client";
import React from "react";

export default function CanvaPromo() {
  const whatsappNumber = "966564911912";
  const message = encodeURIComponent("أريد تفعيل اشتراك كانفا برو السنوي");
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`;

  return (
    <div className="w-full max-w-[1180px] mx-auto my-8 px-4">
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#7d2ae8] via-[#00c4cc] to-[#141b29] p-1 shadow-xl transition-all duration-300 hover:shadow-2xl hover:scale-[1.01]">
        
        {/* تأثير أنيميشن الخلفية المتحركة ببطء */}
        <div className="absolute inset-0 bg-grid-white/[0.1] bg-[size:20px_20px]" />
        
        {/* المحتوى الداخلي للمكون */}
        <div className="relative rounded-[14px] bg-slate-900/90 backdrop-blur-sm p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* الجانب الأيمن: شعار كانفا والنص */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-right gap-4 flex-1">
            
            {/* شعار كانفا احترافي مرسوم بـ SVG مع أنيميشن نبضي */}
            <div className="relative flex-shrink-0 w-16 h-16 bg-gradient-to-tr from-[#7d2ae8] to-[#00c4cc] rounded-2xl flex items-center justify-center shadow-lg animate-pulse">
              <svg className="w-10 h-10 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1.29 13.29c-.18.19-.43.3-.71.3-.28 0-.53-.11-.71-.29l-3.3-3.3c-.18-.18-.29-.43-.29-.71s.11-.53.29-.71l3.3-3.3c.38-.38 1.04-.38 1.42 0 .39.39.39 1.03 0 1.42L10.83 11H17c.55 0 1 .45 1 1s-.45 1-1 1h-6.17l2.46 2.46c.39.39.39 1.03 0 1.42h-.01z" />
              </svg>
              {/* شارة "برو" صغيرة */}
              <span className="absolute -top-1 -left-1 bg-yellow-400 text-slate-900 text-[10px] font-bold px-1.5 py-0.5 rounded-md uppercase tracking-wider shadow">
                Pro
              </span>
            </div>

            {/* النصوص العرض */}
            <div className="space-y-2">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                <span className="bg-red-500 text-white text-xs font-bold px-2.5 py-1 rounded-full animate-bounce">
                  عرض لفترة محدودة! 🔥
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-white">
                  تفعيل اشتراك كانفا برو السنوي
                </h3>
              </div>
              <p className="text-gray-300 text-sm max-w-xl leading-relaxed">
                استمتع بجميع الميزات والخطوط والقوالب المدفوعة لمدّة <span className="text-[#00c4cc] font-bold">سنة كاملة</span>. التفعيل مباشرة على <span className="text-[#7d2ae8] font-bold">إيميلك الشخصي</span> دون الحاجة لإنشاء حساب جديد، وضمان كامل طوال الفترة بواسطة <span className="underline ">منصة BPS Chat</span>.
              </p>
              
              {/* الأسعار بتنسيق مرن وأنيق */}
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 pt-2 text-sm text-gray-200">
                <div className="bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700">
                  🇪🇬 مصر: <strong className="text-emerald-400 text-base">600 ج.م</strong>
                </div>
                <div className="bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700">
                  🇸🇦 السعودية: <strong className="text-emerald-400 text-base">45 ريال</strong>
                </div>
                <div className="bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700">
                  🇦🇪 الإمارات: <strong className="text-emerald-400 text-base">44 درهم</strong>
                </div>
              </div>
            </div>
          </div>

          {/* الجانب الأيسر: زر الإجراء (Call to Action) */}
          <div className="flex-shrink-0 w-full md:w-auto text-center">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 w-full md:w-auto px-8 py-4 bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-lg rounded-xl shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/40 transition-all duration-300 hover:-translate-y-1 group"
            >
              {/* أيقونة واتساب الاهتزازية */}
              <svg className="w-6 h-6 transition-transform group-hover:scale-110" viewBox="0 0 24 24" fill="currentColor">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.517 2.266 2.27 3.51 5.28 3.505 8.484-.01 6.657-5.347 11.996-11.957 11.996-.2.001-.4-.001-.6-.006l-.597.057c-2.004-.001-3.978-.512-5.733-1.483L0 24zm6.17-3.461c1.674.993 3.336 1.517 5.226 1.518 5.485.001 9.948-4.415 9.953-9.855.002-2.636-1.02-5.115-2.881-6.98C16.658 3.355 14.186 2.33 11.55 2.33c-5.487 0-9.952 4.414-9.957 9.853-.002 1.93.52 3.81 1.51 5.495L2.146 21.67l4.081-1.131z" />
              </svg>
              <span>تفعيل عبر الواتساب فوراً</span>
            </a>
          </div>

        </div>
      </div>
    </div>
  );
}