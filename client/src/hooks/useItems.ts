import { useState, useEffect, useCallback } from "react";
import api from "@/lib/api";

type FeedScope = "all" | "my-reports";

export function useItems(scope: FeedScope = "all") {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchItems = useCallback(async () => {
        try {
            setLoading(true);
            const endpoints = {
                all: "/items",
                "my-reports": "/items/my-reports",
            };

            const res = await api.get(endpoints[scope]);
            setItems(res.data);
            setError(null);
        } catch (err: any) {
            setError(err.response?.data?.message || "Failed to fetch items");
        } finally {
            setLoading(false);
        }
    }, [scope]);

    useEffect(() => {
        fetchItems();
    }, [fetchItems]);

    return { items, loading, error, refresh: fetchItems };
}
