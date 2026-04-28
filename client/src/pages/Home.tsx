import { useEffect, useState } from "react";
import ReportCard from "@/components/ReportCard";
import api from "@/lib/api";

export default function Home() {
    const [items, setItems] = useState([]);

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const res = await api.get("items");

                console.log(res.data);

                setItems(res.data);
            } catch (error) {
                console.error("Error fetching items:", error);
            }
        };
        fetchItems();
    }, []);

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-foreground">
                        Recent Activity
                    </h1>
                    <p className="text-sm text-muted-foreground">
                        Latest lost and found reports from the community.
                    </p>
                </div>
            </div>

            <div className="grid gap-4">
                {items.length === 0 ? (
                    <div className="text-center py-20 border-2 border-dashed border-border rounded-lg text-muted-foreground">
                        No items reported yet.
                    </div>
                ) : (
                    items.map((item: any) => (
                        <ReportCard key={item._id} item={item} />
                    ))
                )}
            </div>
        </div>
    );
}
