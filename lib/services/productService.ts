import api from '../api';

export interface ProductCategory {
    _id: string;
    name: string;
}

export interface Product {
    _id: string;
    productId: string;
    title: string;
    description: string;
    status: string;
    price: number;
    stock: number;
    category: ProductCategory;
    images: string[];
    brand: string;
    ratings: number;
    totalReviews: number;
    isFeatured: boolean;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

export async function fetchProducts(): Promise<Product[]> {
    const res = await api.get('/productslist');
    const data = res.data.data;
    return Array.isArray(data) ? data : [];
}
