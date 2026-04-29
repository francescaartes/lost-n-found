import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Search, Package } from "lucide-react";

export default function TypeSection({
    value,
    onChange,
}: {
    value: string;
    onChange: (val: string) => void;
}) {
    return (
        <div className="space-y-3">
            <Label>Report Type</Label>
            <RadioGroup
                value={value}
                onValueChange={onChange}
                className="grid grid-cols-2 gap-4"
            >
                <label className="flex items-center gap-3 border rounded-lg p-4 cursor-pointer hover:bg-muted">
                    <RadioGroupItem value="Lost" />
                    <Search size={18} />
                    Lost Item
                </label>

                <label className="flex items-center gap-3 border rounded-lg p-4 cursor-pointer hover:bg-muted">
                    <RadioGroupItem value="Found" />
                    <Package size={18} />
                    Found Item
                </label>
            </RadioGroup>
        </div>
    );
}
