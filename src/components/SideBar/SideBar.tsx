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
}: {
  labels: string[];
  filterEvent: {
    filterByLabels: (label: string) => void;
    setAllTasks: () => void;
    todaysTask: () => void;
    importantTasks: () => void;
    completeTasks: () => void;
  };
}) {
  const iconClassName = "size-6! inline-block ml-2";

  return (
    <>
      <section className="fixed left-0 w-70 h-[91vh] py-2 overflow-auto">
        <SideBtn
          clickHandler={filterEvent.setAllTasks}
          icon={<RectangleStackIcon className={iconClassName} />}
          text="All Task"
        />
        <SideBtn
          clickHandler={filterEvent.todaysTask}
          icon={<ClockIcon className={iconClassName} />}
          text="Today's Task"
        />
        <SideBtn
          clickHandler={filterEvent.importantTasks}
          icon={<StarIcon className={iconClassName} />}
          text="Important Task"
        />
        <SideBtn
          clickHandler={filterEvent.completeTasks}
          icon={<DocumentCheckIcon className={iconClassName} />}
          text="Completed Task"
        />
        <LabelSection
          filterByLabelEvent={filterEvent.filterByLabels}
          labelData={labels}
        />
      </section>
    </>
  );
}

export default SideBar;
// (label: string) => void;
