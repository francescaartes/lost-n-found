import { FileText } from "lucide-react";

export default function Dashboard({ title }: { title: string }) {
    return (
        <div className="max-w-4xl mx-auto text-center py-20 text-muted-foreground">
            <FileText className="mx-auto h-12 w-12 text-muted-foreground/50 mb-4" />
            <h1 className="text-2xl font-bold text-foreground mb-2">{title}</h1>
            <p>You haven't posted any items yet.</p>
        </div>
    );
}
