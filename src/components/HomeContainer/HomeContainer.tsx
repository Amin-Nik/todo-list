"use client";
import { useEffect, useState } from "react";
import { Task, User } from "@prisma/client";
import SideBar from "../SideBar/SideBar";
import Tasks from "../Tasks/Tasks";
import SearchBar from "../SearchBar/SearchBar";
import ProgressBar from "../ProgressBar/ProgressBar";
import filterTasks from "@/utils/filterTasks";
import DarkModeToggle from "../DarkModeToggle/DarkModeToggle";

function HomeContainer({
  tasks,
  user,
}: {
  tasks: Task[] | undefined;
  user: User;
}) {
  const [searchParams, setSearchParams] = useState([" All Task ", ""]);
  const [filteredTask, setFilteredTask] = useState<Task[]>();
  const [activeBtn, setActiveBtn] = useState(searchParams[0]);
  const [toggleSideBar, setToggleSideBar] = useState(true);
  const [taskCount, setTaskCount] = useState(0);

  useEffect(() => {
    const filterTask = filterTasks(activeBtn, tasks, searchParams);
    setFilteredTask(filterTask);
    setTaskCount(filterTask.length);

    if (window.innerWidth <= 640) {
      setToggleSideBar(false);
    }
  }, [tasks, activeBtn, searchParams]);

  useEffect(() => {
    setActiveBtn(searchParams[0]);
  }, [searchParams]);

  return (
    <>
      <header className="bg-header text-header-foreground sticky top-0 w-full h-14 flex items-center justify-start pl-20 py-2 gap-10">
        <SearchBar
          className="hidden sm:block"
          setSearchParams={setSearchParams}
        />
        <ProgressBar className="hidden lg:block" tasks={tasks} />
        <DarkModeToggle />
        <h1 className="text-2xl">hi {user.name}!</h1>
      </header>

      <main className={`${toggleSideBar && "sm:pl-70"} pl-20`}>
        <SideBar
          taskCount={taskCount}
          activeBtn={activeBtn}
          setActiveBtn={setActiveBtn}
          labels={user.labels}
          toggleSideBar={toggleSideBar}
          setToggleSideBar={setToggleSideBar}
        />
        <section className="flex items-center justify-around flex-wrap gap-4 my-4">
          <ProgressBar className="block lg:hidden mr-2" tasks={tasks} />
          <SearchBar
            className="block sm:hidden mr-2"
            setSearchParams={setSearchParams}
          />
        </section>
        <Tasks
          activeBtn={activeBtn}
          tasks={filteredTask}
          labels={user.labels}
        />
      </main>
    </>
  );
}

export default HomeContainer;
