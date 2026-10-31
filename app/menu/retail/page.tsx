import RetailProductsManager from "@/components/manager/retailManager";

const page = () => {
  const activeTabData = {
    id: "retail",
    label: "منتجات التجزئة",
    description: "إدارة المنتجات الخام والبن والشاي",
    color: "emerald",
    icon: (
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
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
            <div className="bg-linear-to-br from-amber-500 to-emerald-500 p-3 rounded-xl">
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
        <div
          className={` mb-6 p-4 rounded-lg border bg-amber-900/20 border-amber-800/50
        `}
        >
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg bg-amber-600/20 text-amber-400}`}>
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

        <RetailProductsManager />
      </div>
    </div>
  );
};

export default page;
