import { Coffee, DollarSign, Package, AlertTriangle } from "lucide-react";

export default function DashboardPage() {
  const stats = [
    { label: "طلبات اليوم", value: "24", icon: Coffee, color: "text-primary" },
    { label: "إجمالي الإيرادات", value: "1,250 ر.س", icon: DollarSign, color: "text-green-400" },
    { label: "مخزون البيع بالكيلو", value: "145 كجم", icon: Package, color: "text-blue-400" },
    { label: "تنبيهات انخفاض المخزون", value: "3", icon: AlertTriangle, color: "text-red-400" },
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">نظرة عامة على المتجر</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, i) => (
          <div key={i} className="bg-surface border border-border rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-text-secondary text-sm font-medium">{stat.label}</span>
              <stat.icon className={`w-5 h-5 ${stat.color}`} />
            </div>
            <p className="text-3xl font-bold text-text-primary">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="bg-surface border border-border rounded-xl p-6">
        <h3 className="text-lg font-semibold mb-4">آخر الطلبات</h3>
        <p className="text-text-secondary text-sm">انتقل إلى صفحة الطلبات لإدارة الحالات ومتابعة الطلبات الجديدة.</p>
      </div>
    </div>
  );
}