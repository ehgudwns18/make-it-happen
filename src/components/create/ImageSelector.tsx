import { Camera, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface ImageSelectorProps {
    selectedImage: string;
    onSelectImage: (image: string) => void;
    recentImages: string[];
}

export function ImageSelector({ selectedImage, onSelectImage, recentImages }: ImageSelectorProps) {
    return (
        <>
            <div className="aspect-square bg-muted">
                <img
                    src={selectedImage}
                    alt="선택된 이미지"
                    className="w-full h-full object-cover"
                />
            </div>

            <div className="px-4 py-3 flex items-center justify-between border-b border-border">
                <button className="flex items-center gap-1 font-semibold text-sm">
                    최근 항목
                    <ChevronRight className="w-4 h-4" />
                </button>
                <div className="flex gap-2">
                    <button className="p-2 bg-secondary rounded-full">
                        <Camera className="w-4 h-4" />
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-4 gap-0.5">
                {recentImages.map((image, index) => (
                    <button
                        key={index}
                        onClick={() => onSelectImage(image)}
                        className={cn(
                            "aspect-square bg-muted relative overflow-hidden",
                            selectedImage === image && "opacity-50"
                        )}
                    >
                        <img
                            src={image}
                            alt=""
                            className="w-full h-full object-cover"
                            loading="lazy"
                        />
                        {selectedImage === image && (
                            <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                                {/* Selected overlay */}
                            </div>
                        )}
                    </button>
                ))}
            </div>
        </>
    );
}
