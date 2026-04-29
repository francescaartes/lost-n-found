import { useState } from "react";
import { ChevronLeft, ChevronRight, Image as ImageIcon } from "lucide-react";

export default function ImageCarousel({ images }: { images: string[] }) {
    const [index, setIndex] = useState(0);
    const hasImages = images && images.length > 0;

    if (!hasImages) {
        return (
            <div className="w-full h-72 sm:h-80 bg-muted/50 rounded-lg border border-border flex flex-col items-center justify-center text-muted-foreground text-sm gap-2">
                <ImageIcon className="h-6 w-6 opacity-50" />
                No images available
            </div>
        );
    }

    return (
        <div className="relative w-full h-72 sm:h-80 bg-muted/50 rounded-lg overflow-hidden border border-border">
            <img
                src={images[index]}
                className="w-full h-full object-cover"
                alt="Reported item"
            />

            {images.length > 1 && (
                <>
                    <button
                        onClick={() =>
                            setIndex(
                                (prev) =>
                                    (prev - 1 + images.length) % images.length,
                            )
                        }
                        className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white p-2 rounded-full transition-colors"
                    >
                        <ChevronLeft size={18} />
                    </button>

                    <button
                        onClick={() =>
                            setIndex((prev) => (prev + 1) % images.length)
                        }
                        className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white p-2 rounded-full transition-colors"
                    >
                        <ChevronRight size={18} />
                    </button>

                    <div className="absolute bottom-2 right-2 text-xs text-white bg-black/50 px-2 py-1 rounded-full backdrop-blur-sm">
                        {index + 1} / {images.length}
                    </div>
                </>
            )}
        </div>
    );
}
