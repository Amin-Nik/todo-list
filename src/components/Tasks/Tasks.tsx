import { Task } from "@prisma/client";
import TaskCard from "../TaskCard/TaskCard";
import { Card } from "../ui/card";

function Tasks({ tasks }: { tasks: Task[] | undefined }) {
  return (
    <section className="py-4 flex flex-wrap gap-5 justify-center md:justify-start">
      <Card className="size-56 min-w-56 flex justify-center items-center border-dashed border-2 border-gray-400 text-gray-500">
        Create New Task
      </Card>
      {tasks?.map((task) => (
        <TaskCard key={task.id} data={task} />
      ))}
    </section>
  );
}

export default Tasks;
