"use client";
import { Task, User } from "@prisma/client";
import SideBar from "../SideBar/SideBar";
import Tasks from "../Tasks/Tasks";
import { useState } from "react";

function Main({ tasks, user }: { tasks: Task[] | undefined; user: User }) {
  const [filteredTask, setFilteredTask] = useState(tasks);

  const filter = {
    filterByLabels: function (label: string) {
      const filteredTask = tasks?.filter((tsk) => tsk.labels.includes(label));
      setFilteredTask(filteredTask);
    },
    setAllTasks: function () {
      setFilteredTask(tasks);
    },
    todaysTask: function () {},
    importantTasks: function () {
      const filteredTask = tasks?.filter((tsk) => tsk.isImportant);
      setFilteredTask(filteredTask);
    },
    completeTasks: function () {
      const filteredTask = tasks?.filter((tsk) => tsk.isComplete);
      setFilteredTask(filteredTask);
    },
  };

  return (
    <main className="pl-80 ">
      <SideBar filterEvent={filter} labels={user.labels} />
      <Tasks tasks={filteredTask} />
    </main>
  );
}

export default Main;
