import React from 'react';

const recentOrders = [
  { id: '#ORD-7352', customer: 'Alex Johnson', date: 'Oct 23, 2023', amount: '$129.00', status: 'Delivered' },
  { id: '#ORD-7351', customer: 'Sarah Williams', date: 'Oct 23, 2023', amount: '$49.99', status: 'Processing' },
  { id: '#ORD-7350', customer: 'Michael Brown', date: 'Oct 22, 2023', amount: '$899.00', status: 'Pending' },
  { id: '#ORD-7349', customer: 'Emily Davis', date: 'Oct 21, 2023', amount: '$34.50', status: 'Delivered' },
  { id: '#ORD-7348', customer: 'David Miller', date: 'Oct 21, 2023', amount: '$1,299.00', status: 'Processing' },
];

export default function RecentOrders() {
    const getStatusStyle = (status: string) => {
        switch (status) {
            case 'Delivered': return 'bg-green-100 text-green-700';
            case 'Processing': return 'bg-blue-100 text-blue-700';
            case 'Pending': return 'bg-orange-100 text-orange-700';
            default: return 'bg-gray-100 text-gray-700';
        }
    };

    return (
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 h-full">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold text-gray-900">Recent Orders</h3>
                <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">View All</button>
            </div>
            
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[500px]">
                    <thead>
                        <tr className="text-gray-400 text-sm border-b border-gray-100">
                            <th className="pb-3 font-medium">Order ID</th>
                            <th className="pb-3 font-medium">Customer</th>
                            <th className="pb-3 font-medium">Date</th>
                            <th className="pb-3 font-medium">Amount</th>
                            <th className="pb-3 font-medium text-right">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {recentOrders.map((order, index) => (
                            <tr key={index} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors">
                                <td className="py-4 text-sm font-medium text-blue-600 cursor-pointer">{order.id}</td>
                                <td className="py-4 text-sm text-gray-700 font-medium">{order.customer}</td>
                                <td className="py-4 text-sm text-gray-500">{order.date}</td>
                                <td className="py-4 text-sm font-medium text-gray-900">{order.amount}</td>
                                <td className="py-4 text-sm text-right">
                                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusStyle(order.status)}`}>
                                        {order.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
