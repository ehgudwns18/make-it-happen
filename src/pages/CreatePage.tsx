import { useState } from "react";
import { X, Image, Camera, Film, ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { BottomNav } from "@/components/layout/BottomNav";
import { cn } from "@/lib/utils";
import { usePostContext } from "@/context/PostContext";
import { currentUser } from "@/data/mockData";
import { ImageSelector } from "@/components/create/ImageSelector";
import { PostEditor } from "@/components/create/PostEditor";

const recentImages = [
  "/user-upload.jpg",
  "https://images.unsplash.com/photo-1682687982501-1e58ab814714?w=300&h=300&fit=crop",
  "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=300&h=300&fit=crop",
  "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=300&h=300&fit=crop",
  "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=300&h=300&fit=crop",
  "https://images.unsplash.com/photo-1530789253388-582c481c54b0?w=300&h=300&fit=crop",
  "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=300&h=300&fit=crop",
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=300&h=300&fit=crop",
  "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=300&fit=crop",
  "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=300&h=300&fit=crop",
];

const createOptions = [
  { id: "post", label: "게시물", icon: Image },
  { id: "story", label: "스토리", icon: Camera },
  { id: "reel", label: "릴스", icon: Film },
  { id: "live", label: "라이브", icon: Camera },
];

export default function CreatePage() {
  const navigate = useNavigate();
  const { addPost } = usePostContext();
  const [step, setStep] = useState<"select" | "write">("select");
  const [selectedImage, setSelectedImage] = useState(recentImages[0]);
  const [activeType, setActiveType] = useState("post");
  const [caption, setCaption] = useState("");

  const handleShare = () => {
    addPost({
      id: `p-${Date.now()}`,
      user: currentUser,
      images: [selectedImage],
      caption: caption,
      likes: 0,
      comments: [],
      timestamp: new Date(),
      isLiked: false,
      isSaved: false,
      location: "Make It Happen Headquarters",
    });
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background border-b border-border">
        <div className="container max-w-lg mx-auto">
          <div className="flex items-center justify-between h-14 px-4">
            {step === "select" ? (
              <button onClick={() => navigate(-1)} aria-label="닫기">
                <X className="w-6 h-6" />
              </button>
            ) : (
              <button onClick={() => setStep("select")} aria-label="뒤로 가기">
                <ChevronLeft className="w-6 h-6" />
              </button>
            )}

            <h1 className="font-semibold text-base">{step === "select" ? "새 게시물" : "새 게시물 작성"}</h1>

            {step === "select" ? (
              <button
                onClick={() => setStep("write")}
                className="text-primary font-semibold text-sm"
              >
                다음
              </button>
            ) : (
              <button
                onClick={handleShare}
                className="text-primary font-semibold text-sm"
              >
                공유
              </button>
            )}
          </div>
        </div>
      </header>

      <main className="pt-14 pb-20">
        {step === "select" ? (
          <>
            <ImageSelector
              selectedImage={selectedImage}
              onSelectImage={setSelectedImage}
              recentImages={recentImages}
            />
            {/* Type Selector */}
            <div className="fixed bottom-16 left-0 right-0 bg-background/95 backdrop-blur-sm border-t border-border z-10">
              <div className="container max-w-lg mx-auto">
                <div className="flex justify-between px-6 py-3 overflow-x-auto hide-scrollbar">
                  {createOptions.map((option) => (
                    <button
                      key={option.id}
                      onClick={() => setActiveType(option.id)}
                      className={cn(
                        "text-sm font-medium transition-colors whitespace-nowrap px-4 py-1 rounded-full",
                        activeType === option.id
                          ? "bg-foreground text-background"
                          : "text-muted-foreground"
                      )}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </>
        ) : (
          <PostEditor
            selectedImage={selectedImage}
            caption={caption}
            onCaptionChange={setCaption}
          />
        )}
      </main>

      <BottomNav />
    </div>
  );
}
