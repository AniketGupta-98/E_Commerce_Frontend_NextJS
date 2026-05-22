import api from '../api';

export interface Category {
    _id?: string;
    categoryId?: string;
    id?: string;
    name: string;
    description?: string;
    createdAt?: string;
}

export interface CreateCategoryPayload {
    name: string;
    description: string;
}

export interface UpdateCategoryPayload {
    name: string;
    description?: string;
}

export async function fetchCategories(): Promise<Category[]> {
    const res = await api.get('/all/category');
    const data = res.data.data;
    return Array.isArray(data) ? data : [];
}

export async function createCategory(payload: CreateCategoryPayload): Promise<void> {
    await api.post('/add/category', payload);
}

export async function updateCategory(id: string, payload: UpdateCategoryPayload): Promise<void> {
    await api.put(`/category/${id}`, payload);
}

export async function deleteCategory(id: string): Promise<void> {
    await api.delete(`/category/${id}`);
}
