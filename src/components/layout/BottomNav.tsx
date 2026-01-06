import { Home, Search, PlusSquare, Film, User } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { currentUser } from "@/data/mockData";

const navItems = [
  { icon: Home, path: "/", label: "홈" },
  { icon: Search, path: "/explore", label: "검색" },
  { icon: PlusSquare, path: "/create", label: "만들기" },
  { icon: Film, path: "/reels", label: "릴스" },
  { icon: User, path: "/profile", label: "프로필" },
];

export function BottomNav() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 p-4 bottom-nav-safe pointer-events-none">
      <div className="container max-w-sm mx-auto pointer-events-auto">
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-full flex items-center justify-around py-3 px-2 shadow-[0_8px_32px_rgba(0,0,0,0.3)]">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;

            if (item.path === "/profile") {
              return (
                <button
                  key={item.path}
                  onClick={() => navigate(item.path)}
                  className={cn(
                    "flex flex-col items-center gap-0.5 p-2 transition-all",
                    isActive ? "scale-105" : "opacity-70"
                  )}
                  aria-label={item.label}
                >
                  <div
                    className={cn(
                      "w-7 h-7 rounded-full overflow-hidden",
                      isActive && "ring-2 ring-foreground"
                    )}
                  >
                    <img
                      src={currentUser.avatar}
                      alt="프로필"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </button>
              );
            }

            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={cn(
                  "flex flex-col items-center gap-0.5 p-2 transition-all text-white",
                  isActive ? "scale-110 opacity-100" : "opacity-60 hover:opacity-100"
                )}
                aria-label={item.label}
              >
                <Icon
                  className={cn(
                    "w-6 h-6 transition-all",
                    isActive ? "stroke-[2.5px]" : "stroke-[1.5px]"
                  )}
                  fill={isActive && item.icon === Home ? "currentColor" : "none"}
                />
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
