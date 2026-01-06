import { Heart, MessageCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function Header() {
  const navigate = useNavigate();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background border-b border-border">
      <div className="container max-w-lg mx-auto">
        <div className="flex items-center justify-between h-14 px-4">
          <h1 className="text-xl font-bold gradient-text">Project Gram</h1>
          
          <div className="flex items-center gap-4">
            <button
              className="relative p-1 transition-transform active:scale-90"
              aria-label="알림"
            >
              <Heart className="w-6 h-6" />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-destructive text-destructive-foreground text-[10px] font-bold rounded-full flex items-center justify-center">
                3
              </span>
            </button>
            
            <button
              onClick={() => navigate("/messages")}
              className="relative p-1 transition-transform active:scale-90"
              aria-label="메시지"
            >
              <MessageCircle className="w-6 h-6" />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-destructive text-destructive-foreground text-[10px] font-bold rounded-full flex items-center justify-center">
                5
              </span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
