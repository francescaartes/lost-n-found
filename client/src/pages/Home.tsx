import { useState } from "react";
import ItemFeed from "@/components/ItemFeed";
import FilterBar from "@/components/FilterBar";

export default function Home() {
    const noFilter = {
        search: "",
        category: "All",
        type: "All",
        status: "Unresolved",
    };
    const [filters, setFilters] = useState(noFilter);

    const clearFilters = () => {
        setFilters(noFilter);
    };

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <div className="flex flex-col gap-1">
                <h1 className="text-2xl font-bold tracking-tight text-foreground">
                    Lost & Found
                </h1>
                <p className="text-sm text-muted-foreground">
                    Latest lost and found reports from the community.
                </p>
            </div>

            <FilterBar
                filters={filters}
                setFilters={setFilters}
                onClear={clearFilters}
            />

            <ItemFeed
                scope="all"
                filters={filters}
                emptyMessage="No items match your search criteria."
            />
        </div>
    );
}
