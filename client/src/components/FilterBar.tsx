import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Search, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CATEGORIES } from "@/lib/constants";

export default function FilterBar({ filters, setFilters, onClear }: any) {
    const hasActiveFilters =
        (filters.category && filters.category !== "All") ||
        (filters.type && filters.type !== "All") ||
        (filters.status && filters.status !== "Unresolved");

    return (
        <div className="flex flex-col gap-4 mb-8">
            <div className="flex items-center gap-3 w-full">
                <div className="relative flex-1">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Search items, locations, or categories..."
                        className="pl-11 pr-4 h-11 rounded-full bg-muted/50 border-none focus-visible:ring-1 focus-visible:ring-primary/20 w-full"
                        value={filters.search}
                        onChange={(e) =>
                            setFilters({ ...filters, search: e.target.value })
                        }
                    />
                </div>

                <Popover>
                    <PopoverTrigger asChild>
                        <Button
                            variant="outline"
                            className="h-11 rounded-full px-4 flex items-center gap-2 relative shrink-0 bg-background"
                        >
                            <Filter className="h-4 w-4" />
                            <span className="hidden sm:inline">Filters</span>

                            {hasActiveFilters && (
                                <span className="absolute top-1 right-0 -mt-1 -mr-1 flex h-3 w-3">
                                    <span className="absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
                                </span>
                            )}
                        </Button>
                    </PopoverTrigger>

                    <PopoverContent
                        className="w-80 p-4 rounded-xl shadow-lg"
                        align="end"
                    >
                        <div className="space-y-4">
                            <div className="flex items-center justify-between border-b pb-3">
                                <h4 className="font-semibold text-sm">
                                    Filter Results
                                </h4>
                                {hasActiveFilters && (
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={onClear}
                                        className="h-auto p-0 text-xs text-muted-foreground hover:text-destructive"
                                    >
                                        Clear all
                                    </Button>
                                )}
                            </div>

                            <div className="space-y-4">
                                <div className="space-y-1.5">
                                    <label className="text-xs font-medium text-muted-foreground">
                                        Category
                                    </label>
                                    <Select
                                        value={filters.category}
                                        onValueChange={(val) =>
                                            setFilters({
                                                ...filters,
                                                category: val,
                                            })
                                        }
                                    >
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="All Categories" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="All">
                                                All Categories
                                            </SelectItem>
                                            {CATEGORIES.map((cat) => (
                                                <SelectItem
                                                    key={cat}
                                                    value={cat}
                                                >
                                                    {cat}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-xs font-medium text-muted-foreground">
                                        Type
                                    </label>
                                    <Select
                                        value={filters.type}
                                        onValueChange={(val) =>
                                            setFilters({
                                                ...filters,
                                                type: val,
                                            })
                                        }
                                    >
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="All Types" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="All">
                                                All Types
                                            </SelectItem>
                                            <SelectItem value="Lost">
                                                Lost
                                            </SelectItem>
                                            <SelectItem value="Found">
                                                Found
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-xs font-medium text-muted-foreground">
                                        Status
                                    </label>
                                    <Select
                                        value={filters.status || "Unresolved"}
                                        onValueChange={(val) =>
                                            setFilters({
                                                ...filters,
                                                status: val,
                                            })
                                        }
                                    >
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Status" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="All">
                                                All Status
                                            </SelectItem>
                                            <SelectItem value="Unresolved">
                                                Unresolved
                                            </SelectItem>
                                            <SelectItem value="Resolved">
                                                Resolved
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        </div>
                    </PopoverContent>
                </Popover>
            </div>
        </div>
    );
}
