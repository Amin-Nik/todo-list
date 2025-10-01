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
  activeBtn,
  setActiveBtn,
  toggleSideBar,
  setToggleSideBar,
  taskCount,
}: {
  labels: string[];
  activeBtn: string;
  setActiveBtn: React.Dispatch<React.SetStateAction<string>>;
  toggleSideBar: boolean;
  setToggleSideBar: React.Dispatch<React.SetStateAction<boolean>>;
  taskCount: number;
}) {
  const iconClassName = "size-6! inline-block";

  return (
    <>
      <Button
        onClick={() => setToggleSideBar(!toggleSideBar)}
        className="size-11 fixed left-4 top-2 z-20 text-header-foreground hover:bg-sidebar-accent rounded-full bg-transparent transition transition-discrete"
      >
        <Bars3Icon className="size-6" />
      </Button>

      <section
        className={`z-10 sm:backdrop-blur-xs backdrop-blur-3xl transition-all transition-discrete duration-200 fixed left-0 top-14 h-dvh py-2 overflow-auto bg-sidebar text-sidebar-foreground ${
          toggleSideBar ? "w-70 pr-2" : "w-20 pl-3.5"
        }`}
      >
        <SideBtn
          taskCount={taskCount}
          toggleSideBar={toggleSideBar}
          activeBtn={activeBtn}
          setActiveBtn={setActiveBtn}
          icon={<RectangleStackIcon className={iconClassName} />}
          text=" All Task "
        />
        <SideBtn
          taskCount={taskCount}
          toggleSideBar={toggleSideBar}
          activeBtn={activeBtn}
          setActiveBtn={setActiveBtn}
          icon={<ClockIcon className={iconClassName} />}
          text=" Today's Task "
        />
        <SideBtn
          taskCount={taskCount}
          toggleSideBar={toggleSideBar}
          activeBtn={activeBtn}
          setActiveBtn={setActiveBtn}
          icon={<StarIcon className={iconClassName} />}
          text=" Important Task "
        />
        <SideBtn
          taskCount={taskCount}
          toggleSideBar={toggleSideBar}
          activeBtn={activeBtn}
          setActiveBtn={setActiveBtn}
          icon={<DocumentCheckIcon className={iconClassName} />}
          text=" Completed Task "
        />
        <LabelSection
          taskCount={taskCount}
          toggleSideBar={toggleSideBar}
          activeBtn={activeBtn}
          setActiveBtn={setActiveBtn}
          labelData={labels}
        />
      </section>
    </>
  );
}

export default SideBar;
