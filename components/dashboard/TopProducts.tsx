import React from 'react';

const topProducts = [
  { id: 1, name: 'Wireless Noise Cancelling Headphones', sales: 432, price: '$299.00', image: '🎧' },
  { id: 2, name: 'Smart Watch Series 8', sales: 312, price: '$399.00', image: '⌚' },
  { id: 3, name: 'Premium Leather Wallet', sales: 256, price: '$59.00', image: '👝' },
  { id: 4, name: 'Mechanical Keyboard (Cherry Red)', sales: 189, price: '$129.00', image: '⌨️' },
  { id: 5, name: '4K Ultra HD Monitor', sales: 142, price: '$499.00', image: '🖥️' },
];

export default function TopProducts() {
    return (
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 h-full flex flex-col">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold text-gray-900">Top Products</h3>
                <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">Report</button>
            </div>
            
            <div className="flex-1 flex flex-col justify-between">
                {topProducts.map((product) => (
                    <div key={product.id} className="flex items-center gap-4 py-3 border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors px-2 -mx-2 rounded-lg cursor-pointer">
                        <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center text-2xl flex-shrink-0 shadow-inner">
                            {product.image}
                        </div>
                        <div className="flex-1 min-w-0">
                            <h4 className="text-sm font-semibold text-gray-900 truncate" title={product.name}>
                                {product.name}
                            </h4>
                            <p className="text-xs text-gray-500 mt-1">{product.sales} sales this month</p>
                        </div>
                        <div className="text-right">
                            <span className="text-sm font-bold text-gray-900">{product.price}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
