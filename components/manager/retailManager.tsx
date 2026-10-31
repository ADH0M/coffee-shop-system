// components/RetailProductsManager.tsx
"use client";

import { ProductFormData, RetailProduct } from "@/lib/types";
import { useState, useEffect, useCallback } from "react";

export default function RetailProductsManager() {
  const [products, setProducts] = useState<RetailProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState<ProductFormData>({
    name: "",
    category: "",
    price_per_kilo: 0,
    stock_kg: 0,
    producer_id: null,
  });

  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3001";

  const fetchProducts = useCallback(async () => {
    try {
      const response = await fetch(`${BASE_URL}/retailProduct`);
      const data = await response.json();
      setProducts(data.data);
    } catch (error) {
      console.error("خطأ في جلب المنتجات:", error);
    } finally {
      setLoading(false);
    }
  }, [BASE_URL]);

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`${BASE_URL}/retailProducts`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        await fetchProducts();
        setShowAddForm(false);
        setFormData({
          name: "",
          category: "",
          price_per_kilo: 0,
          stock_kg: 0,
          producer_id: null,
        });
      }
    } catch (error) {
      console.error("خطأ في إضافة المنتج:", error);
    }
  };

  const handleDeleteProduct = async (id: number) => {
    if (!confirm("هل أنت متأكد من حذف هذا المنتج؟")) return;

    try {
      const response = await fetch(`${BASE_URL}/retailProducts/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        await fetchProducts();
      }
    } catch (error) {
      console.error("خطأ في حذف المنتج:", error);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchProducts();
  }, [fetchProducts]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-gray-300 text-xl">جاري التحميل...</div>
      </div>
    );
  }

  return (
    <div>
      {/* زر إضافة منتج */}
      <div className="mb-6">
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center gap-2"
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
              إضافة منتج جديد
            </>
          )}
        </button>
      </div>

      {/* نموذج إضافة منتج */}
      {showAddForm && (
        <div className="bg-gray-800 rounded-lg p-6 mb-6 border border-emerald-800/50">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
            إضافة منتج جديد
          </h2>
          <form
            onSubmit={handleAddProduct}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            <div>
              <label className="block text-gray-300 mb-2">اسم المنتج</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full bg-gray-700 border border-gray-600 text-white rounded-lg px-4 py-2 focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-gray-300 mb-2">الفئة</label>
              <select
                required
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
                className="w-full bg-gray-700 border border-gray-600 text-white rounded-lg px-4 py-2 focus:outline-none focus:border-emerald-500"
              >
                <option value="">اختر الفئة</option>
                <option value="بن">بن</option>
                <option value="شاي">شاي</option>
                <option value="بهارات">بهارات</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-300 mb-2">السعر لكل كيلو</label>
              <input
                type="number"
                step="0.01"
                required
                value={formData.price_per_kilo}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    price_per_kilo: parseFloat(e.target.value),
                  })
                }
                className="w-full bg-gray-700 border border-gray-600 text-white rounded-lg px-4 py-2 focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-gray-300 mb-2">الكمية (كجم)</label>
              <input
                type="number"
                step="0.01"
                required
                value={formData.stock_kg}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    stock_kg: parseFloat(e.target.value),
                  })
                }
                className="w-full bg-gray-700 border border-gray-600 text-white rounded-lg px-4 py-2 focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div className="md:col-span-2">
              <button
                type="submit"
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                حفظ المنتج
              </button>
            </div>
          </form>
        </div>
      )}

      {/* جدول المنتجات */}
      <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-700">
              <tr>
                <th className="px-6 py-4 text-right text-sm font-semibold text-gray-300">
                  الاسم
                </th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-gray-300">
                  الفئة
                </th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-gray-300">
                  السعر/كجم
                </th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-gray-300">
                  المخزون (كجم)
                </th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-gray-300">
                  تاريخ الإضافة
                </th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-gray-300">
                  الإجراءات
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {products.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="px-6 py-8 text-center text-gray-400"
                  >
                    لا توجد منتجات متوفرة
                  </td>
                </tr>
              ) : (
                products.map((product) => (
                  <tr
                    key={product.id}
                    className="hover:bg-gray-700/50 transition-colors"
                  >
                    <td className="px-6 py-4 text-white">{product.name}</td>
                    <td className="px-6 py-4">
                      <span className="bg-emerald-900/50 text-emerald-300 px-3 py-1 rounded-full text-sm">
                        {product.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-300">
                      {product.price_per_kilo} ر.ي
                    </td>
                    <td className="px-6 py-4 text-gray-300">
                      {product.stock_kg}
                    </td>
                    <td className="px-6 py-4 text-gray-400 text-sm">
                      {new Date(product.created_at).toLocaleDateString("ar-SA")}
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleDeleteProduct(product.id)}
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
