import { useState, useEffect } from "react";
import { toast } from "sonner";

export function useImageUpload(
    initialImages: string[] = [],
    maxLimit: number = 3,
) {
    const [existingImages, setExistingImages] = useState<string[]>([]);
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const [previews, setPreviews] = useState<string[]>([]);

    const imagesString = JSON.stringify(initialImages);

    useEffect(() => {
        if (initialImages && initialImages.length > 0) {
            setExistingImages(initialImages);
            setPreviews(initialImages);
        } else {
            setExistingImages([]);
            setPreviews([]);
        }
        setSelectedFiles([]);
    }, [imagesString]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return;

        const filesArray = Array.from(e.target.files);

        if (
            existingImages.length + selectedFiles.length + filesArray.length >
            maxLimit
        ) {
            toast.error(`You can only upload up to ${maxLimit} images total`);
            return;
        }

        setSelectedFiles((prev) => [...prev, ...filesArray]);

        setPreviews((prev) => [
            ...prev,
            ...filesArray.map((f) => URL.createObjectURL(f)),
        ]);

        e.target.value = "";
    };

    const removeImage = (index: number) => {
        if (index < existingImages.length) {
            setExistingImages((prev) => prev.filter((_, i) => i !== index));
        } else {
            const fileIndex = index - existingImages.length;
            setSelectedFiles((prev) => prev.filter((_, i) => i !== fileIndex));
        }
        setPreviews((prev) => prev.filter((_, i) => i !== index));
    };

    return {
        existingImages,
        selectedFiles,
        previews,
        handleFileChange,
        removeImage,
    };
}
