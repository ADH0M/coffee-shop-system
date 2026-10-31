import { ShoppingBag } from "lucide-react";
import { Input } from "../ui/input";
import React from "react";

type Props<T> = {
  address: T;
  setAddress: React.Dispatch<React.SetStateAction<T>>;
  customerName: T;
  setCustomerName: React.Dispatch<React.SetStateAction<T>>;
};

const UserInfo: React.FC<Props<string>> = ({
  customerName,
  setCustomerName,
  address,
  setAddress,
}) => {
  return (
    <>
      {/* بيانات العميل */}
      <div className="bg-surface border border-border rounded-xl p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <ShoppingBag className="w-5 h-5 text-primary" />
          بيانات العميل
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-text-secondary mb-2">
              اسم العميل <span className="text-red-400">*</span>
            </label>
            <Input
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              placeholder="مثال: أحمد محمد"
            />
          </div>
          <div>
            <label className="block text-sm text-text-secondary mb-2">
              العنوان <span className="text-text-secondary/50">(اختياري)</span>
            </label>
            <Input
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="مثال: شارع الملك فهد، الرياض"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default UserInfo;
