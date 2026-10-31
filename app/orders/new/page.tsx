// app/orders/new/page.tsx
"use client";
import { useState, useMemo } from "react";
import { api } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import {
  Trash2,
  ShoppingBag,
  ArrowRight,
  Loader2,
  AlertCircle,
} from "lucide-react";
import UserInfo from "@/components/newOrder/UserInfo";
import AddProducts from "@/components/newOrder/AddProducts";


export interface CartItem {
  id: string; 
  type: "beverage" | "retail";
  productId: number | undefined;
  name: string | undefined;
  quantity: number;
  unitPrice: number;
  unit: string; 
}

export default function NewOrderPage() {
  const router = useRouter();

  const [customerName, setCustomerName] = useState("");
  const [address, setAddress] = useState("");

  const [cart, setCart] = useState<CartItem[]>([]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const total = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0);
  }, [cart]);


  const handleRemoveFromCart = (id: string) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const handleSubmit = async () => {
    if (!customerName.trim()) {
      setError("يرجى إدخال اسم العميل");
      return;
    }
    if (cart.length === 0) {
      setError("يرجى إضافة منتج واحد على الأقل للطلب");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      // 1. إنشاء الطلب
      const newOrder = await api.createOrder({
        customer_name: customerName,
        address: address || undefined,
        total_price: total,
      });

      // 2. إضافة عناصر الطلب واحداً تلو الآخر
      for (const item of cart) {
        await api.createOrderItem({
          order_id: newOrder.id,
          beverage_id: item.type === "beverage" ? item.productId : undefined,
          retail_product_id:
            item.type === "retail" ? item.productId : undefined,
          quantity: item.quantity,
          unit_price: item.unitPrice,
        });
      }

      // 3. الانتقال إلى صفحة الطلبات
      router.push("/orders");
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message || "حدث خطأ أثناء حفظ الطلب");
      } else {
        setError("مشكله في السيرفر");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={() => router.push("/orders")}
          className="p-2 rounded-lg hover:bg-surfaceHighlight transition-colors"
        >
          <ArrowRight className="w-5 h-5" />
        </button>
        <div>
          <h2 className="text-2xl font-bold">إنشاء طلب جديد</h2>
          <p className="text-text-secondary text-sm mt-1">
            أدخل بيانات العميل وأضف المنتجات المطلوبة
          </p>
        </div>
      </div>

      {error && (
        <div className="mb-6 bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-lg flex items-center gap-2">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* right section  */}
        <div className="lg:col-span-2 space-y-6">
          <UserInfo
            address={address}
            customerName={customerName}
            setAddress={setAddress}
            setCustomerName={setCustomerName}
          />

          <AddProducts setCart={setCart} setError={setError} />
        </div>

        {/* القسم الأيسر: ملخص الطلب */}
        <div className="lg:col-span-1 overflow-auto">
          <div className="bg-surface border border-border rounded-xl p-6 sticky top-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-primary" />
              ملخص الطلب
            </h3>

            {cart.length === 0 ? (
              <div className="text-center py-8 text-text-secondary text-sm">
                <ShoppingBag className="w-10 h-10 mx-auto mb-2 opacity-30" />
                <p>السلة فارغة</p>
                <p className="text-xs mt-1">أضف منتجات من القائمة</p>
              </div>
            ) : (
              <div className="space-y-3 mb-4 max-h-80 overflow-y-auto">
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="bg-background border border-border rounded-lg p-3"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex-1">
                        <p className="font-medium text-sm">{item.name}</p>
                        <p className="text-xs text-text-secondary mt-0.5">
                          {item.quantity} {item.unit} × {item.unitPrice} ر.س
                        </p>
                      </div>
                      <button
                        onClick={() => handleRemoveFromCart(item.id)}
                        className="text-red-400 hover:text-red-300 p-1 rounded transition-colors"
                        title="حذف"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="flex justify-between items-center pt-2 border-t border-border">
                      <span
                        className={`text-xs px-2 py-0.5 rounded ${
                          item.type === "beverage"
                            ? "bg-amber-500/10 text-amber-400"
                            : "bg-blue-500/10 text-blue-400"
                        }`}
                      >
                        {item.type === "beverage" ? "مشروب" : "منتج بالكيلو"}
                      </span>
                      <span className="text-primary font-bold text-sm">
                        {(item.quantity * item.unitPrice).toFixed(2)} ر.س
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* الإجمالي */}
            <div className="border-t border-border pt-4 space-y-2">
              <div className="flex justify-between text-text-secondary text-sm">
                <span>عدد العناصر:</span>
                <span>{cart.length}</span>
              </div>
              <div className="flex justify-between items-center pt-2 border-t border-border">
                <span className="font-semibold">الإجمالي</span>
                <span className="text-2xl font-bold text-primary">
                  {total.toFixed(2)} ر.س
                </span>
              </div>
            </div>

            {/* زر الحفظ */}
            <Button
              onClick={handleSubmit}
              disabled={isSubmitting || cart.length === 0}
              className="w-full mt-4"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 ml-2 animate-spin" />
                  جاري الحفظ...
                </>
              ) : (
                <>
                  <ShoppingBag className="w-4 h-4 ml-2" />
                  حفظ الطلب
                </>
              )}
            </Button>
          </div>
        </div>
      </div>

    </div>
  );
}
