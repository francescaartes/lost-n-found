import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { CATEGORIES } from "@/lib/constants";

export default function DetailSection({
    title,
    category,
    description,
    onTitleChange,
    onCategoryChange,
    onDescriptionChange,
}: {
    title: string;
    category: string;
    description: string;
    onTitleChange: (val: string) => void;
    onCategoryChange: (val: string) => void;
    onDescriptionChange: (val: string) => void;
}) {
    return (
        <>
            <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label>Item Title</Label>
                    <Input
                        placeholder="e.g. Black Wallet"
                        value={title}
                        onChange={(e) => onTitleChange(e.target.value)}
                        required
                    />
                </div>

                <div className="space-y-2">
                    <Label>Category</Label>
                    <Select value={category} onValueChange={onCategoryChange}>
                        <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                            {CATEGORIES.map((cat) => (
                                <SelectItem key={cat} value={cat}>
                                    {cat}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </div>

            <div className="space-y-2">
                <Label>Description</Label>
                <Textarea
                    placeholder="Describe the item (color, brand, unique marks)..."
                    rows={4}
                    value={description}
                    onChange={(e) => onDescriptionChange(e.target.value)}
                    required
                />
            </div>
        </>
    );
}
