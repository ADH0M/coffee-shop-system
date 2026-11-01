"use client";
import { Producer } from "@/lib/types";
import { Plus, Trash2Icon } from "lucide-react";
import React, { useState, useEffect, useCallback } from "react";

const ProducersManager = () => {
  // State for managing producers data
  const [producers, setProducers] = useState<Producer[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState<
    Omit<Producer, "producer_id" | "created_at">
  >({
    name: "",
    rating: 0,
    phones: [""],
  });

  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3001";
  const fetchProducers = useCallback(async () => {
    try {
      const response = await fetch(`${BASE_URL}/producer`);
      const data = await response.json();
      setProducers(data.data);
    } catch (error) {
      console.error("خطأ في جلب الموردين:", error);
    } finally {
      setIsLoading(false);
    }
  }, [BASE_URL]);

  const handleAddProducers = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`${BASE_URL}/producer`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        await fetchProducers();
        setShowAddForm(false);
        setFormData({
          name: "",
          rating: 0,
          phones: [""],
        });
      }
    } catch (error) {
      console.error("خطأ في إضافة المشروب:", error);
    }
  };

  const handleDeleteProducer = async (id: number) => {
    if (!confirm("هل أنت متأكد من حذف هذا المورد؟")) return;

    try {
      const response = await fetch(`${BASE_URL}/producer/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        await fetchProducers();
      }
    } catch (error) {
      console.error("خطأ في حذف المشروب:", error);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchProducers();
  }, [fetchProducers]);

  // Helper to render star rating
  const renderRating = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(
          <span key={i} className="text-yellow-400">
            ★
          </span>,
        );
      } else if (i === fullStars && hasHalfStar) {
        stars.push(
          <span key={i} className="text-yellow-400">
            ★
          </span>,
        );
      } else {
        stars.push(
          <span key={i} className="text-gray-600">
            ★
          </span>,
        );
      }
    }
    return (
      <div className="flex gap-0.5 text-sm">
        {stars} <span className="text-gray-400 mr-1">({rating})</span>
      </div>
    );
  };

  return (
    <div className="bg-gray-800 rounded-xl border border-gray-700 shadow-lg overflow-hidden">
      {/* Header & Actions */}
      <div className="p-6 border-b border-gray-700 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h3 className="text-xl font-bold text-white">قائمة الموردين</h3>
          <p className="text-sm text-gray-400 mt-1">
            إجمالي الموردين: {producers.length}
          </p>
        </div>

        <button
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white
         font-medium px-4 py-2 rounded-lg transition-colors shadow-md"
          onClick={() => setShowAddForm((prev) => !prev)}
        >
          <Plus />
          إضافة مورد جديد
        </button>
      </div>
      {showAddForm && (
        <div className="bg-gray-800 rounded-lg p-6 mb-6 border border-amber-800/50">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <span className="w-2 h-2 bg-amber-500 rounded-full"></span>
            إضافة مورد جديد
          </h2>
          <form
            onSubmit={handleAddProducers}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            <div>
              <label className="block text-gray-300 mb-2">الاسم </label>
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
              <label className="block text-gray-300 mb-2">التقيم</label>
              <input
                type="number"
                step="0.5"
                required
                max={5}
                min={0.5}
                value={formData.rating}
                onChange={(e) => {
                  setFormData((prev) => ({
                    ...prev,
                    rating: Number(e.target.value),
                  }));
                }}
                className="w-full bg-gray-700 border border-gray-600 text-white rounded-lg px-4 py-2 focus:outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="block text-gray-300 mb-2">رقم التليفون</label>
              <input
                type="phone"
                max={11}
                min={11}
                value={formData.phones?.[0] ?? ""}
                onChange={(e) => {
                  setFormData((prev) => ({
                    ...prev,
                    phones: [e.target.value],
                  }));
                }}
                className="w-full bg-gray-700 border border-gray-600 text-white rounded-lg px-4 py-2 focus:outline-none focus:border-amber-500"
              />
            </div>

            <div className="md:col-span-2">
              <button
                type="submit"
                className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                حفظ 
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Table Content */}
      <div className="overflow-x-auto">
        {isLoading ? (
          <div className="p-12 text-center text-gray-400">
            <svg
              className="animate-spin h-8 w-8 text-blue-500 mx-auto mb-3"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            جاري تحميل بيانات الموردين...
          </div>
        ) : (
          <table className="w-full text-right">
            <thead className="bg-gray-900/50 text-gray-400 uppercase text-xs font-semibold tracking-wider">
              <tr>
                <th className="px-6 py-4">اسم المورد</th>
                <th className="px-6 py-4">التقييم</th>
                <th className="px-6 py-4">أرقام التواصل</th>
                <th className="px-6 py-4">تاريخ الإضافة</th>
                <th className="px-6 py-4 text-center">إجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {producers.map((producer, ind) => (
                <tr
                  key={producer.producer_id}
                  className="hover:bg-gray-700/30 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-blue-900/50 flex items-center justify-center text-blue-400 font-bold border border-blue-800">
                        {producer.name.charAt(0)}
                      </div>
                      <span className="text-white font-medium">
                        {producer.name}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {renderRating(producer.rating)}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-2">
                      {producer?.phones?.map((phone, idx) => (
                        <span
                          key={idx}
                          className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-700 text-gray-300 border border-gray-600"
                        >
                          {phone}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                    {new Date(producer.created_at).toLocaleDateString("ar-EG")}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <div className="flex justify-center gap-2">
                      <button
                        className="p-2 text-blue-400 hover:bg-blue-900/30 rounded-lg transition-colors"
                        title="تعديل"
                      >
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
                            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                          />
                        </svg>
                      </button>
                      <button
                        className="p-2 text-red-400 hover:bg-red-900/30 rounded-lg transition-colors"
                        title="حذف"
                      >
                        <Trash2Icon
                          size={18}
                          onClick={() =>
                            handleDeleteProducer(producer.producer_id)
                          }
                        />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default ProducersManager;
