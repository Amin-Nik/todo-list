import HomeContainer from "@/components/HomeContainer/HomeContainer";
import { findUserAndTasksBySession } from "@/utils/action";

export default async function Home() {
  const userAndTasks = await findUserAndTasksBySession();
  const user = userAndTasks?.user;
  const tasks = userAndTasks?.tasks;

  return <>{user && <HomeContainer user={user} tasks={tasks} />}</>;
}
