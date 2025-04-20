import { Task } from "@prisma/client";
import { useEffect, useState } from "react";

function ProgressBar({
  tasks,
  className,
}: {
  tasks: Task[] | undefined;
  className?: string;
}) {
  const [progress, setProgress] = useState(100);
  const [tasksLengths, setTasksLengths] = useState([0, 0]);

  useEffect(() => {
    calculateCompletenessOfTasks();
  }, [tasks]);

  const calculateCompletenessOfTasks = () => {
    const AllTaskLength = tasks?.length || 0;
    const completedTaskLength =
      tasks?.filter((task) => task.isComplete).length || 0;
    const completeness = (completedTaskLength / AllTaskLength) * 100;
    const reverseCompleteness = 100 - completeness;
    setTasksLengths([AllTaskLength, completedTaskLength]);
    setProgress(reverseCompleteness);
  };

  return (
    <section className={`w-80 ${className}`}>
      <div className="flex justify-between mb-0.5 px-2 text-xs">
        <span>Task Completeness</span>
        <span>{`${tasksLengths[1]}/${tasksLengths[0]}`}</span>
      </div>
      <div className="rounded-full border border-header-foreground">
        <div className=" h-5 w-full rounded-full bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 flex justify-end">
          <div
            style={{ width: `${progress}%` }}
            className={`h-5 ${
              progress == 100 ? "rounded-full" : "rounded-r-full"
            } bg-header transition-all duration-700`}
          ></div>
        </div>
      </div>
    </section>
  );
}

export default ProgressBar;
