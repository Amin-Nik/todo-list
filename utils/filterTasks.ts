import { Task } from "@prisma/client";

function filterTasks(
  activeBtn: string,
  tasks: Task[] = [],
  searchParams: string[]
) {
  let filteredTask = tasks;
  switch (activeBtn) {
    case " Search ":
      filteredTask = filter.filterBySearchInput(tasks, searchParams[1]);
      break;
    case " All Task ":
      filteredTask = filter.setAllTasks(tasks);
      break;
    case " Today's Task ":
      filteredTask = filter.todaysTask(tasks);
      break;
    case " Important Task ":
      filteredTask = filter.importantTasks(tasks);
      break;
    case " Completed Task ":
      filteredTask = filter.completeTasks(tasks);
      break;
    default:
      filteredTask = filter.filterByLabels(tasks, activeBtn);
      break;
  }
  return filteredTask;
}

const filter = {
  filterBySearchInput: function (tasks: Task[], searchParameter: string) {
    const filteredTask = tasks.filter(
      (tsk) =>
        tsk.title.includes(searchParameter) ||
        tsk.description.includes(searchParameter)
    );
    return filteredTask || [];
  },

  filterByLabels: function (tasks: Task[], label: string) {
    const filteredTask = tasks.filter((tsk) => tsk.labels.includes(label));
    return filteredTask;
  },

  setAllTasks: function (tasks: Task[]) {
    const filteredTask = tasks.filter((tsk) => !tsk.isComplete);
    return filteredTask;
  },

  todaysTask: function (tasks: Task[]) {
    const today = new Date();
    const filteredTask = tasks.filter((tsk) => {
      if (tsk.date) {
        const taskDate = new Date(tsk.date);
        return taskDate.toDateString() == today.toDateString();
      }
    });
    return filteredTask;
  },

  importantTasks: function (tasks: Task[]) {
    const filteredTask = tasks.filter((tsk) => tsk.isImportant);
    return filteredTask;
  },

  completeTasks: function (tasks: Task[]) {
    const filteredTask = tasks.filter((tsk) => tsk.isComplete);
    return filteredTask;
  },
};

export default filterTasks;
