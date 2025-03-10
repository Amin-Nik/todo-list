import {
  RectangleStackIcon,
  ClockIcon,
  StarIcon,
  DocumentCheckIcon,
} from "@heroicons/react/24/solid";

import SideBtn from "../SideBtn/SideBtn";
import LabelSection from "../LabelSection/LabelSection";

function SideBar({
  labels,
  filterEvent,
  activeBtn,
  setActiveBtn,
  allTasksLength,
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
}) {
  const iconClassName = "size-6! inline-block ml-2";

  return (
    <>
      <section className="fixed left-0 w-70 h-[91vh] py-2 overflow-auto">
        <SideBtn
          allTasksLength={allTasksLength}
          activeBtn={activeBtn}
          setActiveBtn={setActiveBtn}
          clickHandler={filterEvent.setAllTasks}
          icon={<RectangleStackIcon className={iconClassName} />}
          text="All Task"
        />
        <SideBtn
          activeBtn={activeBtn}
          setActiveBtn={setActiveBtn}
          clickHandler={filterEvent.todaysTask}
          icon={<ClockIcon className={iconClassName} />}
          text="Today's Task"
        />
        <SideBtn
          activeBtn={activeBtn}
          setActiveBtn={setActiveBtn}
          clickHandler={filterEvent.importantTasks}
          icon={<StarIcon className={iconClassName} />}
          text="Important Task"
        />
        <SideBtn
          activeBtn={activeBtn}
          setActiveBtn={setActiveBtn}
          clickHandler={filterEvent.completeTasks}
          icon={<DocumentCheckIcon className={iconClassName} />}
          text="Completed Task"
        />
        <LabelSection
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
