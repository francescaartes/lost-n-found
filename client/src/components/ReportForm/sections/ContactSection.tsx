import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { CONTACT_METHODS } from "@/lib/constants";

export default function ContactSection({
    method,
    value,
    onMethodChange,
    onValueChange,
}: {
    method: string;
    value: string;
    onMethodChange: (val: string) => void;
    onValueChange: (val: string) => void;
}) {
    return (
        <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
                <Label>Contact Method</Label>
                <Select value={method} onValueChange={onMethodChange}>
                    <SelectTrigger>
                        <SelectValue placeholder="Select method" />
                    </SelectTrigger>
                    <SelectContent>
                        {CONTACT_METHODS.map((m) => (
                            <SelectItem key={m} value={m}>
                                {m}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            <div className="space-y-2">
                <Label>Contact Details</Label>
                <Input
                    placeholder="Email, phone number, or social link"
                    value={value}
                    onChange={(e) => onValueChange(e.target.value)}
                />
            </div>
        </div>
    );
}
