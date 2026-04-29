import { MessageCircle } from "lucide-react";

export default function ContactCard({
    contactPreference,
}: {
    contactPreference: any;
}) {
    if (!contactPreference?.value) return null;

    return (
        <div className="bg-primary/10 p-4 rounded-lg border border-primary/20">
            <h4 className="text-sm font-semibold text-primary mb-2">
                Contact Information
            </h4>
            <div className="space-y-2 text-sm text-primary/90">
                <div className="flex items-center gap-2 overflow-hidden">
                    <MessageCircle className="h-4 w-4 shrink-0" />
                    {contactPreference.value}
                </div>
            </div>
        </div>
    );
}
