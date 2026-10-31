import { Beverage, RetailProduct } from "@/lib/types";
import { Coffee, Package, Plus } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import React, { useEffect, useMemo, useState } from "react";
import { api } from "@/lib/api";
import { CartItem } from "@/app/orders/new/page";

interface Props {
  setCart: React.Dispatch<React.SetStateAction<CartItem[]>>;
  setError: React.Dispatch<React.SetStateAction<string | null>>;
}

const AddProducts: React.FC<Props> = ({ setError, setCart }) => {
  // القوائم المتاحة
  const [beverages, setBeverages] = useState<Beverage[]>([]);
  const [retailProducts, setRetailProducts] = useState<RetailProduct[]>([]);

  // التبويب النشط (مشروبات / منتجات بالكيلو)
  const [activeTab, setActiveTab] = useState<"beverage" | "retail">("beverage");

  // النموذج الحالي لإضافة عنصر
  const [selectedProductId, setSelectedProductId] = useState<number | "">("");
  const [quantity, setQuantity] = useState<number>(1);

  const selectedProduct = useMemo(() => {
    if (selectedProductId === "") return null;
    if (activeTab === "beverage") {
      const b =  beverages.find((b) => b.id === selectedProductId) || null;
      return {...b , type :"beverage"}
    }
    const r =  retailProducts.find((b) => b.id === selectedProductId) || null;
    return {...r , type :"retailProduct"}
  }, [selectedProductId, activeTab, beverages, retailProducts]);

  const handleAddToCart = () => {
    if (selectedProductId === "" || quantity <= 0) {
      setError("يرجى اختيار منتج وإدخال كمية صحيحة");
      return;
    }

    if (!selectedProduct) return;

    const newItem: CartItem = {
      id: `${Date.now()}-${Math.random()}`,
      type: activeTab,
      productId: selectedProduct.id ,
      name: selectedProduct.name ,
      quantity,
      unitPrice:
        activeTab === "beverage"
          ? (selectedProduct as Beverage).price
          : (selectedProduct as RetailProduct).price_per_kilo,
      unit: activeTab === "beverage" ? "كوب" : "كجم",
    };

    setCart((prev) => {
      return [...prev, newItem];
    });
    setSelectedProductId("");
    setQuantity(1);
    setError(null);
  };

  useEffect(() => {
    api
      .getBeverages()
      .then((res) => setBeverages(res.data))
      .catch(console.error);
    api
      .getRetailProducts()
      .then((res) => setRetailProducts(res.data))
      .catch(console.error);
  }, []);

  return (
    <div className="bg-surface border border-border rounded-xl p-6">
      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <Plus className="w-5 h-5 text-primary" />
        إضافة منتجات للطلب
      </h3>

      {/* التبويبات */}
      <div className="flex gap-2 mb-5 border-b border-border">
        <button
          onClick={() => {
            setActiveTab("beverage");
            setSelectedProductId("");
          }}
          className={`px-4 py-2 font-medium text-sm transition-colors border-b-2 -mb-px ${
            activeTab === "beverage"
              ? "border-primary text-primary"
              : "border-transparent text-text-secondary hover:text-text-primary"
          }`}
        >
          <span className="flex items-center gap-2">
            <Coffee className="w-4 h-4" />
            المشروبات (بالكوب)
          </span>
        </button>
        <button
          onClick={() => {
            setActiveTab("retail");
            setSelectedProductId("");
          }}
          className={`px-4 py-2 font-medium text-sm transition-colors border-b-2 -mb-px ${
            activeTab === "retail"
              ? "border-primary text-primary"
              : "border-transparent text-text-secondary hover:text-text-primary"
          }`}
        >
          <span className="flex items-center gap-2">
            <Package className="w-4 h-4" />
            منتجات بالكيلو
          </span>
        </button>
      </div>

      {/* نموذج الإضافة */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
        <div className="md:col-span-6">
          <label className="block text-sm text-text-secondary mb-2">
            {activeTab === "beverage" ? "اختر المشروب" : "اختر المنتج"}
          </label>
          <select
            value={selectedProductId}
            onChange={(e) =>
              setSelectedProductId(e.target.value ? Number(e.target.value) : "")
            }
            className="w-full bg-background border border-border rounded-lg px-3 py-2 text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-right"
          >
            <option value="">-- اختر --</option>
            {activeTab === "beverage"
              ? beverages.map((b) => (
                  <option key={b.id} value={b.id}>
                    {b.name} - {b.price} ر.س
                  </option>
                ))
              : retailProducts.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name} - {p.price_per_kilo} ر.س/كجم (متوفر: {p.stock_kg}{" "}
                    كجم)
                  </option>
                ))}
          </select>
        </div>

        <div className="md:col-span-3">
          <label className="block text-sm text-text-secondary mb-2">
            الكمية ({activeTab === "beverage" ? "كوب" : "كجم"})
          </label>
          <Input
            type="number"
            min={activeTab === "beverage" ? 1 : 0.1}
            step={activeTab === "beverage" ? 1 : 0.1}
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
          />
        </div>

        <div className="md:col-span-3">
          <Button onClick={handleAddToCart} className="w-full">
            <Plus className="w-4 h-4 ml-2" />
            إضافة
          </Button>
        </div>
      </div>

      {/* عرض تفاصيل المنتج المختار */}
      {selectedProduct && (
        <div className="mt-4 p-4 bg-background border border-border rounded-lg">
          <div className="flex justify-between items-start">
            <div>
              <p className="font-semibold">{selectedProduct.name}</p>
              {activeTab === "beverage" ? (
                <p className="text-sm text-text-secondary mt-1">
                  النوع: {(selectedProduct as Beverage).drink_type}
                  {(selectedProduct as Beverage).is_mahuj && " • بن محوج"}
                </p>
              ) : (
                <p className="text-sm text-text-secondary mt-1">
                  التصنيف: {(selectedProduct as RetailProduct).category}
                </p>
              )}
            </div>
            <div className="text-primary font-bold">
              {selectedProduct.type === "beverage"
                ? (selectedProduct as Beverage).price
                : (selectedProduct as RetailProduct).price_per_kilo}{" "}
              ر.س
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddProducts;
