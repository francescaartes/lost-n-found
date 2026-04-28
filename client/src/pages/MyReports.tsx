import ItemFeed from "@/components/ItemFeed";

export default function MyReports() {
    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <div>
                <h1 className="text-2xl font-bold tracking-tight text-foreground">
                    My Reports
                </h1>
                <p className="text-sm text-muted-foreground">
                    Manage the items you have reported to the community.
                </p>
            </div>

            <ItemFeed
                scope="my-reports"
                emptyMessage="You haven't posted any items yet."
            />
        </div>
    );
}
