import { Task } from "@prisma/client";
import TaskCard from "../TaskCard/TaskCard";
import { Card } from "../ui/card";

function Tasks({
  tasks,
  labels,
}: {
  tasks: Task[] | undefined;
  labels: string[];
}) {
  return (
    <section className="py-4 px-2 flex flex-wrap gap-5 justify-center md:justify-start">
      <Card className="h-44 w-60 min-w-60 flex justify-center items-center border-dashed border-2 border-gray-400 text-gray-500">
        Create New Task
      </Card>
      {tasks?.map((task) => (
        <TaskCard key={task.id} data={task} labels={labels} />
      ))}
    </section>
  );
}

export default Tasks;
