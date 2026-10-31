/* eslint-disable react-hooks/immutability */
// app/orders/page.tsx
"use client";
import { useState, useEffect } from "react";
import { api } from "@/lib/api";
import { Order } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Plus, RefreshCw } from "lucide-react";
import Link from "next/link";

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      setLoading(true);
      const data = await api.getOrders();
      if (data.success) {
        setOrders(data.data);
      }
    } catch (err) {
      console.error("فشل في تحميل الطلبات", err);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id: number, newStatus: string) => {
    try {
      await api.updateOrderStatus(id, newStatus);
      loadOrders();
    } catch (err) {
      console.error("فشل في تحديث الحالة", err);
    }
  };

  if (loading)
    return <div className="text-text-secondary">جاري تحميل الطلبات...</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">إدارة الطلبات</h2>
        <div className="flex gap-2">
          <Button onClick={loadOrders} variant="ghost">
            <RefreshCw className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>

      <div className="bg-surface border border-border rounded-xl overflow-hidden">
        <table className="w-full text-right">
          <thead className="bg-surfaceHighlight text-text-secondary text-sm">
            <tr>
              <th className="px-6 py-4">رقم الطلب</th>
              <th className="px-6 py-4">اسم العميل</th>
              <th className="px-6 py-4">الإجمالي</th>
              <th className="px-6 py-4">الحالة</th>
              <th className="px-6 py-4">التاريخ</th>
              <th className="px-6 py-4">الإجراءات</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {orders.map((order) => (
              <tr
                key={order.id}
                className="hover:bg-surfaceHighlight/50 transition-colors"
              >
                <td className="px-6 py-4 font-mono text-text-secondary">
                  #{order.id}
                </td>
                <td className="px-6 py-4 font-medium">{order.customer_name}</td>
                <td className="px-6 py-4 text-primary font-semibold">
                  {order.total_price} ج.م
                </td>
                <td className="px-6 py-4">
                  <Badge status={order.status} />
                </td>
                <td className="px-6 py-4 text-text-secondary text-sm">
                  {new Date(order.created_at).toLocaleDateString("ar-SA")}
                </td>
                <td className="px-6 py-4">
                  <select
                    value={order.status}
                    onChange={(e) =>
                      handleStatusChange(order.id, e.target.value)
                    }
                    className="bg-background border border-border rounded px-2 py-1 text-sm text-text-primary focus:ring-1 focus:ring-primary outline-none text-right"
                  >
                    <option value="pending">قيد الانتظار</option>
                    <option value="preparing">قيد التحضير</option>
                    <option value="completed">مكتمل</option>
                    <option value="cancelled">ملغي</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {orders.length === 0 && (
          <div className="p-8 text-center text-text-secondary">
            لا توجد طلبات حالياً.
          </div>
        )}
      </div>

      <Link href="/orders/new" className="">
        <Button className="flex justify-center gap-2">
          <Plus className="" />
          <span>طلب جديد</span>
        </Button>
      </Link>
    </div>
  );
}
