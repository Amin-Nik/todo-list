import { Task } from "@prisma/client";
import { Card } from "../ui/card";
import TaskCard from "../TaskCard/TaskCard";
import TaskExpandDialog from "../TaskExpandDialog/TaskExpandDialog";

function Tasks({
  tasks,
  labels,
  activeBtn,
}: {
  tasks: Task[];
  labels: string[];
  activeBtn: string;
}) {
  const initialTask: Task = {
    id: "",
    date: null,
    description: "",
    isComplete: false,
    isImportant: false,
    labels: [],
    title: "",
    userId: "",
  };

  (() => {
    switch (activeBtn) {
      case "Search":
        break;
      case " All Task ":
        break;
      case " Today's Task ":
        initialTask.date = new Date();
        break;
      case " Important Task ":
        initialTask.isImportant = true;
        break;
      case " Completed Task ":
        initialTask.isComplete = true;
        break;
      default:
        initialTask.labels.push(activeBtn);
        break;
    }
  })();

  return (
    <section className="py-4 px-2 flex flex-wrap gap-5 justify-center md:justify-start">
      <TaskExpandDialog
        newTask={true}
        data={initialTask}
        labels={labels}
        triggerChild={
          <Card className="bg-transparent backdrop-blur-xs text-foreground cursor-pointer h-44 w-60 min-w-60 flex justify-center items-center border-dashed border-2 border-ring ">
            Create New Task
          </Card>
        }
      />

      {tasks?.map((task) => (
        <TaskCard key={task.id} data={task} labels={labels} />
      ))}
    </section>
  );
}

export default Tasks;
