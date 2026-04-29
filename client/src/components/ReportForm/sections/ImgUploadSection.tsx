import { Label } from "@/components/ui/label";
import { Plus, X } from "lucide-react";
import type React from "react";

export default function ImgUploadSection({
    previews,
    removeImage,
    handleFileChange,
}: {
    previews: string[];
    removeImage: (index: number) => void;
    handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
    return (
        <>
            <div className="space-y-4">
                <Label>Upload Images (Max 3)</Label>

                <div className="grid grid-cols-3 sm:grid-cols-5 gap-4">
                    {previews.map((url, index) => (
                        <div
                            key={url}
                            className="relative aspect-square rounded-md border overflow-hidden group"
                        >
                            <img
                                src={url}
                                alt="preview"
                                className="w-full h-full object-cover"
                            />
                            <button
                                type="button"
                                onClick={() => removeImage(index)}
                                className="absolute top-0 right-0 bg-primary text-background p-2 rounded-bl-md opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                                <X size={20} />
                            </button>
                        </div>
                    ))}

                    {previews.length < 3 && (
                        <label className="aspect-square flex flex-col items-center justify-center border-2 border-dashed rounded-md cursor-pointer hover:bg-muted transition-colors">
                            <Plus size={24} className="text-muted-foreground" />
                            <span className="text-[10px] uppercase font-bold text-muted-foreground mt-1">
                                Add
                            </span>
                            <input
                                type="file"
                                multiple
                                accept="image/*"
                                className="hidden"
                                onChange={handleFileChange}
                            />
                        </label>
                    )}
                </div>
            </div>
        </>
    );
}
