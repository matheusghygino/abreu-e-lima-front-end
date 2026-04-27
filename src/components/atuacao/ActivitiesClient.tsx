import ActivityCard from "./ActivityCard";

export default function ActivitiesClient({ activities }) {
  return (
    <div class="grid gap-6 md:grid-cols-3">
      {activities.slice(0, 3).map((activity) => (
        <ActivityCard
          key={activity.slug}
          href={`/atuacao/${activity.slug}`}
          title={activity.title}
          excerpt={activity.excerpt}
          image={activity.image}   // ✅ agora VAI aparecer
          date={activity.date}
          location={activity.location}
          tags={activity.tags}
        />
      ))}
    </div>
  );
}
