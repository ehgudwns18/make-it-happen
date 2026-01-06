import { stories, currentUser } from "@/data/mockData";
import { StoryCircle } from "./StoryCircle";

export function StoriesRow() {
  const ownStory = {
    id: "own",
    user: currentUser,
    imageUrl: "",
    timestamp: new Date(),
    isViewed: false,
  };

  return (
    <section className="border-b border-border">
      <div className="flex gap-3 overflow-x-auto hide-scrollbar py-4 px-4">
        <StoryCircle story={ownStory} isOwn />
        {stories.slice(1).map((story) => (
          <StoryCircle key={story.id} story={story} />
        ))}
      </div>
    </section>
  );
}
