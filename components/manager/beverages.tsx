// components/BeveragesManager.tsx
"use client";

import { Beverage, BeverageFormData } from "@/lib/types";
import { useState, useEffect, useCallback } from "react";

export default function BeveragesManager() {
  const [beverages, setBeverages] = useState<Beverage[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState<BeverageFormData>({
    name: "",
    drink_type: "",
    roast_level: null,
    is_mahuj: false,
    price: 0,
    description: null,
  });

  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3001";
  const fetchBeverages = useCallback(async () => {
    try {
      const response = await fetch(`${BASE_URL}/beverages`);
      const data = await response.json();
      setBeverages(data.data);
    } catch (error) {
      console.error("خطأ في جلب المشروبات:", error);
    } finally {
      setLoading(false);
    }
  }, [BASE_URL]);

  const handleAddBeverage = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`${BASE_URL}/beverages`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        await fetchBeverages();
        setShowAddForm(false);
        setFormData({
          name: "",
          drink_type: "",
          roast_level: null,
          is_mahuj: false,
          price: 0,
          description: null,
        });
      }
    } catch (error) {
      console.error("خطأ في إضافة المشروب:", error);
    }
  };

  const handleDeleteBeverage = async (id: number) => {
    if (!confirm("هل أنت متأكد من حذف هذا المشروب؟")) return;

    try {
      const response = await fetch(`${BASE_URL}/beverages/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        await fetchBeverages();
      }
    } catch (error) {
      console.error("خطأ في حذف المشروب:", error);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchBeverages();
  }, [fetchBeverages]);
  
  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-gray-300 text-xl">جاري التحميل...</div>
      </div>
    );
  }

  return (
    <div>
      {/* زر إضافة مشروب */}
      <div className="mb-6">
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center gap-2"
        >
          {showAddForm ? (
            <>
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
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
              إلغاء
            </>
          ) : (
            <>
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
                  d="M12 4v16m8-8H4"
                />
              </svg>
              إضافة مشروب جديد
            </>
          )}
        </button>
      </div>

      {/* نموذج إضافة مشروب */}
      {showAddForm && (
        <div className="bg-gray-800 rounded-lg p-6 mb-6 border border-amber-800/50">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <span className="w-2 h-2 bg-amber-500 rounded-full"></span>
            إضافة مشروب جديد
          </h2>
          <form
            onSubmit={handleAddBeverage}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            <div>
              <label className="block text-gray-300 mb-2">اسم المشروب</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full bg-gray-700 border border-gray-600 text-white rounded-lg px-4 py-2 focus:outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="block text-gray-300 mb-2">نوع المشروب</label>
              <select
                required
                value={formData.drink_type}
                onChange={(e) =>
                  setFormData({ ...formData, drink_type: e.target.value })
                }
                className="w-full bg-gray-700 border border-gray-600 text-white rounded-lg px-4 py-2 focus:outline-none focus:border-amber-500"
              >
                <option value="">اختر النوع</option>
                <option value="قهوة">قهوة</option>
                <option value="شاي">شاي</option>
                <option value="ينسون">ينسون</option>
                <option value="شاي حليب">شاي حليب</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-300 mb-2">درجة التحميص</label>
              <select
                value={formData.roast_level || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    roast_level: e.target.value || null,
                  })
                }
                className="w-full bg-gray-700 border border-gray-600 text-white rounded-lg px-4 py-2 focus:outline-none focus:border-amber-500"
              >
                <option value="">بدون</option>
                <option value="فاتح">فاتح</option>
                <option value="متوسط">متوسط</option>
                <option value="داكن">داكن</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-300 mb-2">السعر</label>
              <input
                type="number"
                step="0.01"
                required
                value={formData.price}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    price: parseFloat(e.target.value),
                  })
                }
                className="w-full bg-gray-700 border border-gray-600 text-white rounded-lg px-4 py-2 focus:outline-none focus:border-amber-500"
              />
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="is_mahuj"
                checked={formData.is_mahuj}
                onChange={(e) =>
                  setFormData({ ...formData, is_mahuj: e.target.checked })
                }
                className="w-5 h-5 accent-amber-600"
              />
              <label htmlFor="is_mahuj" className="text-gray-300">
                بن محوج
              </label>
            </div>

            <div className="md:col-span-2">
              <label className="block text-gray-300 mb-2">الوصف</label>
              <textarea
                value={formData.description || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    description: e.target.value || null,
                  })
                }
                rows={3}
                maxLength={200}
                className="w-full bg-gray-700 border border-gray-600 text-white rounded-lg px-4 py-2 focus:outline-none focus:border-amber-500"
              />
            </div>

            <div className="md:col-span-2">
              <button
                type="submit"
                className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                حفظ المشروب
              </button>
            </div>
          </form>
        </div>
      )}

      {/* جدول المشروبات */}
      <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-700">
              <tr>
                <th className="px-6 py-4 text-right text-sm font-semibold text-gray-300">
                  الاسم
                </th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-gray-300">
                  النوع
                </th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-gray-300">
                  درجة التحميص
                </th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-gray-300">
                  محوج
                </th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-gray-300">
                  السعر
                </th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-gray-300">
                  الوصف
                </th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-gray-300">
                  الإجراءات
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {beverages.length === 0 ? (
                <tr>
                  <td
                    colSpan={7}
                    className="px-6 py-8 text-center text-gray-400"
                  >
                    لا توجد مشروبات متوفرة
                  </td>
                </tr>
              ) : (
                beverages.map((beverage) => (
                  <tr
                    key={beverage.id}
                    className="hover:bg-gray-700/50 transition-colors"
                  >
                    <td className="px-6 py-4 text-white font-medium">
                      {beverage.name}
                    </td>
                    <td className="px-6 py-4">
                      <span className="bg-amber-900/50 text-amber-300 px-3 py-1 rounded-full text-sm">
                        {beverage.drink_type}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-300">
                      {beverage.roast_level || "-"}
                    </td>
                    <td className="px-6 py-4">
                      {beverage.is_mahuj ? (
                        <span className="bg-green-900/50 text-green-300 px-3 py-1 rounded-full text-sm">
                          نعم
                        </span>
                      ) : (
                        <span className="bg-gray-700 text-gray-400 px-3 py-1 rounded-full text-sm">
                          لا
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-gray-300">
                      {beverage.price} ر.ي
                    </td>
                    <td className="px-6 py-4 text-gray-400 text-sm max-w-xs truncate">
                      {beverage.description || "-"}
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleDeleteBeverage(beverage.id)}
                        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                      >
                        حذف
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
