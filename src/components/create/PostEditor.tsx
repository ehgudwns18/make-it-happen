import { ChevronRight } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

interface PostEditorProps {
    selectedImage: string;
    caption: string;
    onCaptionChange: (caption: string) => void;
}

export function PostEditor({ selectedImage, caption, onCaptionChange }: PostEditorProps) {
    return (
        <div className="px-4 py-6 animate-fade-in">
            <div className="flex gap-4 mb-6">
                <div className="w-16 h-16 bg-muted rounded overflow-hidden flex-shrink-0">
                    <img
                        src={selectedImage}
                        alt="Thumbnail"
                        className="w-full h-full object-cover"
                    />
                </div>
                <Textarea
                    value={caption}
                    onChange={(e) => onCaptionChange(e.target.value)}
                    placeholder="문구 입력... #해시태그"
                    className="flex-1 min-h-[100px] text-base border-none focus-visible:ring-0 p-0 resize-none placeholder:text-muted-foreground/70"
                />
            </div>

            <div className="border-t border-border">
                <button className="w-full py-4 flex items-center justify-between text-sm border-b border-border">
                    <span>사람 태그하기</span>
                    <ChevronRight className="w-4 h-4 text-muted-foreground" />
                </button>
                <button className="w-full py-4 flex items-center justify-between text-sm border-b border-border">
                    <span>위치 추가</span>
                    <ChevronRight className="w-4 h-4 text-muted-foreground" />
                </button>
                <button className="w-full py-4 flex items-center justify-between text-sm border-b border-border">
                    <span>음악 추가</span>
                    <ChevronRight className="w-4 h-4 text-muted-foreground" />
                </button>
            </div>
        </div>
    );
}
