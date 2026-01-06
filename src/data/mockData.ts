import { User, Story, Post, Reel } from "@/types";

export const currentUser: User = {
  id: "0",
  username: "project.gram",
  name: "Project Gram",
  avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop",
  bio: "📸 Visual storytelling\n✨ Creating moments",
  followers: 1234,
  following: 567,
  posts: 42,
  isVerified: true,
};

export const users: User[] = [
  {
    id: "1",
    username: "alex.travel",
    name: "Alex Kim",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop",
    followers: 12500,
    following: 890,
    posts: 156,
    isVerified: true,
  },
  {
    id: "2",
    username: "foodie_jane",
    name: "Jane Park",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop",
    followers: 8900,
    following: 432,
    posts: 89,
  },
  {
    id: "3",
    username: "urban_photo",
    name: "Mike Chen",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop",
    followers: 45000,
    following: 234,
    posts: 312,
    isVerified: true,
  },
  {
    id: "4",
    username: "style.mia",
    name: "Mia Lee",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop",
    followers: 28000,
    following: 567,
    posts: 201,
  },
  {
    id: "5",
    username: "tech_david",
    name: "David Oh",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop",
    followers: 15600,
    following: 890,
    posts: 78,
  },
  {
    id: "6",
    username: "nature_luna",
    name: "Luna Kim",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop",
    followers: 9800,
    following: 345,
    posts: 134,
  },
];

export const stories: Story[] = [
  {
    id: "s1",
    user: currentUser,
    imageUrl: "https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=400&h=700&fit=crop",
    timestamp: new Date(),
    isViewed: false,
  },
  ...users.map((user, index) => ({
    id: `s${index + 2}`,
    user,
    imageUrl: `https://images.unsplash.com/photo-${1682687220742 + index * 1000}?w=400&h=700&fit=crop`,
    timestamp: new Date(Date.now() - index * 3600000),
    isViewed: index > 2,
  })),
];

export const posts: Post[] = [
  {
    id: "p1",
    user: users[0],
    images: [
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=600&fit=crop",
    ],
    caption: "산 위에서 바라본 일출 🌄 새벽 4시에 일어난 보람이 있네요 #sunrise #mountain #travel",
    likes: 2456,
    comments: [
      {
        id: "c1",
        user: users[1],
        text: "와 정말 멋진 풍경이네요! 😍",
        timestamp: new Date(Date.now() - 3500000),
        likes: 12,
        replies: [
          {
            id: "r1",
            user: users[0],
            text: "감사합니다! 정말 힘든 등산이었지만 보람찼어요 :)",
            timestamp: new Date(Date.now() - 3400000),
            likes: 2,
          }
        ]
      },
      {
        id: "c2",
        user: users[2],
        text: "등산 가고 싶어지는 사진입니다 ㅎㅎ",
        timestamp: new Date(Date.now() - 3000000),
        likes: 5,
      },
    ],
    timestamp: new Date(Date.now() - 3600000),
    isLiked: false,
    isSaved: false,
    location: "설악산, 한국",
  },
  {
    id: "p2",
    user: users[1],
    images: [
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&h=600&fit=crop",
    ],
    caption: "오늘의 브런치 🥑 주말은 역시 맛있는 음식과 함께 ☕️ #brunch #foodie #weekend",
    likes: 1823,
    comments: [
      {
        id: "c3",
        user: users[3],
        text: "여기 브런치 진짜 맛있죠! 😋",
        timestamp: new Date(Date.now() - 7000000),
        likes: 8,
      }
    ],
    timestamp: new Date(Date.now() - 7200000),
    isLiked: true,
    isSaved: false,
    location: "카페 온더플레이트",
  },
  {
    id: "p3",
    user: users[2],
    images: [
      "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=600&h=600&fit=crop",
    ],
    caption: "도시의 밤은 언제나 아름다워 🌃 #cityscape #nightphotography #urban",
    likes: 5621,
    comments: [],
    timestamp: new Date(Date.now() - 14400000),
    isLiked: false,
    isSaved: true,
    location: "서울, 한국",
  },
  {
    id: "p4",
    user: users[3],
    images: [
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600&h=600&fit=crop",
    ],
    caption: "오늘의 OOTD 👗 봄 느낌 물씬~ #ootd #fashion #spring",
    likes: 3245,
    comments: [],
    timestamp: new Date(Date.now() - 28800000),
    isLiked: false,
    isSaved: false,
  },
  {
    id: "p5",
    user: users[4],
    images: [
      "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&h=600&fit=crop",
    ],
    caption: "새 작업 환경 셋업 완료! 🖥️ 생산성 200% 업 예상 #workspace #tech #setup",
    likes: 1567,
    comments: [],
    timestamp: new Date(Date.now() - 43200000),
    isLiked: false,
    isSaved: false,
  },
];

export const exploreImages = [
  "https://images.unsplash.com/photo-1682687982501-1e58ab814714?w=300&h=300&fit=crop",
  "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=300&fit=crop",
  "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=300&h=300&fit=crop",
  "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=300&h=300&fit=crop",
  "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=300&h=300&fit=crop",
  "https://images.unsplash.com/photo-1518770660439-4636190af475?w=300&h=300&fit=crop",
  "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=300&h=300&fit=crop",
  "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=300&h=300&fit=crop",
  "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=300&h=300&fit=crop",
  "https://images.unsplash.com/photo-1530789253388-582c481c54b0?w=300&h=300&fit=crop",
  "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=300&h=300&fit=crop",
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=300&h=300&fit=crop",
];

export const reels: Reel[] = [
  {
    id: "r1",
    user: users[0],
    videoUrl: "",
    thumbnailUrl: "https://images.unsplash.com/photo-1682687982501-1e58ab814714?w=400&h=700&fit=crop",
    caption: "일출의 순간을 담았어요 ✨ #sunrise #timelapse",
    likes: 45200,
    comments: 1234,
    shares: 567,
    audioName: "Original Audio - alex.travel",
    isLiked: false,
  },
  {
    id: "r2",
    user: users[1],
    videoUrl: "",
    thumbnailUrl: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&h=700&fit=crop",
    caption: "초간단 파스타 레시피 🍝 #cooking #recipe",
    likes: 32100,
    comments: 892,
    shares: 1203,
    audioName: "Cooking Vibes - foodie_jane",
    isLiked: true,
  },
  {
    id: "r3",
    user: users[2],
    videoUrl: "",
    thumbnailUrl: "https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=400&h=700&fit=crop",
    caption: "서울의 밤거리 🌙 #seoul #nightwalk",
    likes: 67800,
    comments: 2341,
    shares: 890,
    audioName: "City Lights - urban_photo",
    isLiked: false,
  },
];
