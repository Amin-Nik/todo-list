import {
  RectangleStackIcon,
  ClockIcon,
  StarIcon,
  DocumentCheckIcon,
  Bars3Icon,
} from "@heroicons/react/24/solid";

import SideBtn from "../SideBtn/SideBtn";
import LabelSection from "../LabelSection/LabelSection";
import { Button } from "../ui/button";

function SideBar({
  labels,
  filterEvent,
  activeBtn,
  setActiveBtn,
  allTasksLength,
  toggleSideBar,
  setToggleSideBar,
}: {
  labels: string[];
  filterEvent: {
    filterByLabels: (label: string) => number | undefined;
    setAllTasks: () => number | undefined;
    todaysTask: () => number | undefined;
    importantTasks: () => number | undefined;
    completeTasks: () => number | undefined;
  };
  activeBtn: string;
  setActiveBtn: React.Dispatch<React.SetStateAction<string>>;
  allTasksLength: number | undefined;
  toggleSideBar: boolean;
  setToggleSideBar: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const iconClassName = "size-6! inline-block";

  return (
    <>
      <Button
        onClick={() => setToggleSideBar(!toggleSideBar)}
        className="size-11 fixed left-4 top-2 hover:bg-gray-200 rounded-full bg-transparent transition transition-discrete"
      >
        <Bars3Icon className="size-6 text-black" />
      </Button>

      <section
        className={`transition-all transition-discrete duration-200 fixed left-0 h-[91vh] py-2 overflow-auto bg-primary ${
          toggleSideBar ? "w-70" : "w-20 pl-3.5"
        }`}
      >
        <SideBtn
          toggleSideBar={toggleSideBar}
          allTasksLength={allTasksLength}
          activeBtn={activeBtn}
          setActiveBtn={setActiveBtn}
          clickHandler={filterEvent.setAllTasks}
          icon={<RectangleStackIcon className={iconClassName} />}
          text="All Task"
        />
        <SideBtn
          toggleSideBar={toggleSideBar}
          activeBtn={activeBtn}
          setActiveBtn={setActiveBtn}
          clickHandler={filterEvent.todaysTask}
          icon={<ClockIcon className={iconClassName} />}
          text="Today's Task"
        />
        <SideBtn
          toggleSideBar={toggleSideBar}
          activeBtn={activeBtn}
          setActiveBtn={setActiveBtn}
          clickHandler={filterEvent.importantTasks}
          icon={<StarIcon className={iconClassName} />}
          text="Important Task"
        />
        <SideBtn
          toggleSideBar={toggleSideBar}
          activeBtn={activeBtn}
          setActiveBtn={setActiveBtn}
          clickHandler={filterEvent.completeTasks}
          icon={<DocumentCheckIcon className={iconClassName} />}
          text="Completed Task"
        />
        <LabelSection
          toggleSideBar={toggleSideBar}
          activeBtn={activeBtn}
          setActiveBtn={setActiveBtn}
          filterByLabelEvent={filterEvent.filterByLabels}
          labelData={labels}
        />
      </section>
    </>
  );
}

export default SideBar;
// (label: string) => void;
