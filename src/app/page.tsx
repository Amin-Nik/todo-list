import HomeContainer from "@/components/HomeContainer/HomeContainer";
import { GetUser, GetTask } from "@/utils/action";

export default async function Home() {
  const tasks = await GetTask();
  const user = await GetUser();

  return <>{user && <HomeContainer user={user} tasks={tasks} />}</>;
}
