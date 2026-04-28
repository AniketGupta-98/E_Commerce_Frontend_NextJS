import api from '../api';

export interface AppUser {
    userId: string;
    Fname: string;
    Lname: string;
    email: string;
    role: string;
    isActive: boolean;
    [key: string]: unknown;
}

export interface CreateUserPayload {
    Fname: string;
    Lname: string;
    email: string;
    role: string;
    password: string;
}

export interface UpdateUserPayload {
    userId: string;
    Fname: string;
    Lname: string;
    email: string;
    isActive: boolean;
    role: string;
}

export async function fetchUsers(): Promise<AppUser[]> {
    const res = await api.get('/users');
    const data = res.data.user;
    return Array.isArray(data) ? data : [];
}

export async function createUser(payload: CreateUserPayload): Promise<void> {
    await api.post('/admin/usercreate', payload);
}

export async function updateUser(payload: UpdateUserPayload): Promise<void> {
    await api.put('/admin/userupdate', payload);
}

export async function deleteUser(userId: string, email: string): Promise<void> {
    await api.delete(`/admin/deleteuser/${userId}/${email}`);
}
