import { useState, useEffect, useCallback } from "react";
import api from "@/lib/api";

type FeedScope = "all" | "my-reports";

export function useItems(scope: FeedScope = "all", filters?: any) {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchItems = useCallback(async () => {
        try {
            setLoading(true);

            const params = new URLSearchParams();

            if (filters?.search) params.append("search", filters.search);
            if (filters?.category && filters.category !== "All")
                params.append("category", filters.category);
            if (filters?.type && filters.type !== "All")
                params.append("type", filters.type);
            if (filters?.status && filters?.status !== "All")
                params.append("status", filters.status);

            const endpoints = {
                all: "/items",
                "my-reports": "/items/my-reports",
            };

            const res = await api.get(endpoints[scope], { params });

            setItems(res.data);
            setError(null);
        } catch (err: any) {
            setError(err.response?.data?.message || "Failed to fetch items");
        } finally {
            setLoading(false);
        }
    }, [
        scope,
        filters?.search,
        filters?.category,
        filters?.type,
        filters?.status,
    ]);

    useEffect(() => {
        const handler = setTimeout(() => {
            fetchItems();
        }, 400);

        return () => clearTimeout(handler);
    }, [fetchItems]);

    return { items, loading, error, refresh: fetchItems };
}
