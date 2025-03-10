"use client";
import { Task, User } from "@prisma/client";
import SideBar from "../SideBar/SideBar";
import Tasks from "../Tasks/Tasks";
import { useState } from "react";

function Main({ tasks, user }: { tasks: Task[] | undefined; user: User }) {
  const [filteredTask, setFilteredTask] = useState(tasks);
  const [activeBtn, setActiveBtn] = useState("All Task");

  const filter = {
    filterByLabels: function (label: string) {
      const filteredTask = tasks?.filter((tsk) => tsk.labels.includes(label));
      setFilteredTask(filteredTask);
      return filteredTask?.length;
    },
    setAllTasks: function () {
      setFilteredTask(tasks);
      return tasks?.length;
    },
    todaysTask: function () {
      const today = new Date();
      const filteredTask = tasks?.filter(
        (tsk) => tsk.date.toDateString() == today.toDateString()
      );
      setFilteredTask(filteredTask);
      return filteredTask?.length;
    },
    importantTasks: function () {
      const filteredTask = tasks?.filter((tsk) => tsk.isImportant);
      setFilteredTask(filteredTask);
      return filteredTask?.length;
    },
    completeTasks: function () {
      const filteredTask = tasks?.filter((tsk) => tsk.isComplete);
      setFilteredTask(filteredTask);
      return filteredTask?.length;
    },
  };

  return (
    <main className="pl-80 ">
      <SideBar
        allTasksLength={tasks?.length}
        activeBtn={activeBtn}
        setActiveBtn={setActiveBtn}
        filterEvent={filter}
        labels={user.labels}
      />
      <Tasks tasks={filteredTask} />
    </main>
  );
}

export default Main;
