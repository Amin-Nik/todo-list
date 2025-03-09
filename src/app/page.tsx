import HomeContainer from "@/components/HomeContainer/HomeContainer";
import { GetUser, GetTask } from "@/utils/action";
import { unstable_cache } from "next/cache";

export default async function Home() {
  const getCachedUser = unstable_cache(
    async () => {
      return await GetUser();
    },
    ["label"],
    { tags: ["label"], revalidate: 1 }
  );
  const tasks = await GetTask();
  const user = await getCachedUser();

  return <>{user && <HomeContainer user={user} tasks={tasks} />}</>;
}
