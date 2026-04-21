export const getRoleBadge = (role: string) => {
    switch (role) {
        case 'Admin': return 'bg-indigo-50 text-indigo-700 border-indigo-200';
        case 'Manager': return 'bg-sky-50 text-sky-700 border-sky-200';
        default: return 'bg-slate-50 text-slate-700 border-slate-200';
    }
};

export const getStatusBadge = (status: boolean) => {
    switch (status) {
        case status == true: return 'bg-emerald-50 text-emerald-700 border border-emerald-200';
        case status == false: return 'bg-slate-100 text-slate-600 border border-slate-200';
        default: return 'bg-slate-50 text-slate-700 border border-slate-200';
    }
};

export const avatarColors = [
    "bg-amber-500",
    "bg-rose-500",
    "bg-emerald-500",
    "bg-sky-500",
    "bg-indigo-500",
    "bg-slate-500",
];
