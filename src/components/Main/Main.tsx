"use client";
import { Task, User } from "@prisma/client";
import SideBar from "../SideBar/SideBar";
import Tasks from "../Tasks/Tasks";
import { useEffect, useState } from "react";

function Main({ tasks, user }: { tasks: Task[] | undefined; user: User }) {
  const [filteredTask, setFilteredTask] = useState<Task[]>();
  const [activeBtn, setActiveBtn] = useState(" All Task ");
  const [toggleSideBar, setToggleSideBar] = useState(true);
  const [taskCount, setTaskCount] = useState(0);

  useEffect(() => {
    filterTaskForStart();
    if (window.innerWidth <= 640) {
      setToggleSideBar(false);
    }
  }, [tasks]);

  const filterTaskForStart = () => {
    switch (activeBtn) {
      case " All Task ":
        filter.setAllTasks();
        break;
      case " Today's Task ":
        filter.todaysTask();
        break;
      case " Important Task ":
        filter.importantTasks();
        break;
      case " Completed Task ":
        filter.completeTasks();
        break;
      default:
        filter.filterByLabels(activeBtn);
        break;
    }
  };

  const filter = {
    filterByLabels: function (label: string) {
      const filteredTask = tasks?.filter((tsk) => tsk.labels.includes(label));
      setFilteredTask(filteredTask);
      setTaskCount(filteredTask?.length || 0);
    },

    setAllTasks: function () {
      const filteredTask = tasks?.filter((tsk) => !tsk.isComplete);
      setFilteredTask(filteredTask);
      setTaskCount(filteredTask?.length || 0);
    },

    todaysTask: function () {
      const today = new Date();
      const filteredTask = tasks?.filter((tsk) => {
        if (tsk.date) {
          const taskDate = new Date(tsk.date);
          return taskDate.toDateString() == today.toDateString();
        }
      });
      setFilteredTask(filteredTask);
      setTaskCount(filteredTask?.length || 0);
    },

    importantTasks: function () {
      const filteredTask = tasks?.filter((tsk) => tsk.isImportant);
      setFilteredTask(filteredTask);
      setTaskCount(filteredTask?.length || 0);
    },

    completeTasks: function () {
      const filteredTask = tasks?.filter((tsk) => tsk.isComplete);
      setFilteredTask(filteredTask);
      setTaskCount(filteredTask?.length || 0);
    },
  };

  return (
    <main className={`${toggleSideBar && "sm:pl-74"} pl-20`}>
      <SideBar
        taskCount={taskCount}
        allTasksLength={0}
        activeBtn={activeBtn}
        setActiveBtn={setActiveBtn}
        filterEvent={filter}
        labels={user.labels}
        toggleSideBar={toggleSideBar}
        setToggleSideBar={setToggleSideBar}
      />
      <Tasks tasks={filteredTask} labels={user.labels} />
    </main>
  );
}

export default Main;
