import ProducersManager from "@/components/manager/producers";
import React from "react";

const page = () => {
  const activeTabData = {
    id: "producers",
    label: "الموردين",
    description: "إدارة بيانات الموردين وأرقام التواصل والتقييمات",
    color: "blue",
    icon: (
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        {/* User Group / Suppliers Icon */}
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
        />
      </svg>
    ),
  };

  return (
    <div className="min-h-screen bg-gray-900" dir="rtl">
      {/* الهيدر الرئيسي */}
      <header className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-8 py-6">
          <div className="flex items-center gap-4 mb-2">
            <div className="bg-linear-to-br from-blue-500 to-indigo-600 p-3 rounded-xl">
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                />
              </svg>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">إدارة المقهى</h1>
              <p className="text-gray-400 text-sm">
                إدارة شاملة للمنتجات والمشروبات
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* محتوى التبويب النشط */}
      <div className="max-w-7xl mx-auto px-8 py-6">
        {/* بطاقة معلومات التبويب */}
        <div className="mb-6 p-4 rounded-lg border bg-blue-900/20 border-blue-800/50">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-blue-600/20 text-blue-400">
              {activeTabData.icon}
            </div>
            <div>
              <h2 className="text-lg font-semibold text-white">
                {activeTabData.label}
              </h2>
              <p className="text-sm text-gray-400">
                {activeTabData.description}
              </p>
            </div>
          </div>
        </div>

        {/* مكون إدارة الموردين */}
        <ProducersManager />
      </div>
    </div>
  );
};

export default page;
