import { Button } from "../ui/button";
import { Label } from "../ui/label";

function SideBtn({
  icon,
  text,
  editAndDeleteIcon,
  activeBtn,
  setActiveBtn,
  toggleSideBar,
  taskCount,
}: {
  icon: React.ReactNode;
  text: string;
  editAndDeleteIcon?: React.ReactNode;
  activeBtn: string;
  setActiveBtn: React.Dispatch<React.SetStateAction<string>>;
  toggleSideBar: boolean;
  taskCount: number;
}) {
  return (
    <div className="relative group">
      <Button
        onClick={() => {
          setActiveBtn(text);
        }}
        className={`bg-inherit hover:bg-background text-inherit transition-all transition-discrete duration-300 h-12 w-12 flex justify-start gap-4 ${
          activeBtn == text && "bg-sidebar-accent text-sidebar-foreground"
        } ${toggleSideBar ? "w-full rounded-r-full! pl-6!" : "rounded-full"}`}
      >
        {activeBtn == text ? (
          <Label
            className={`${
              toggleSideBar && "left-0.5"
            } relative right-[1px] flex justify-center items-center rounded-full p-1.5 bg-sidebar-foreground text-sidebar-accent-foreground`}
          >
            {taskCount}
          </Label>
        ) : (
          <>{icon}</>
        )}
        {toggleSideBar && <span className="w-3/5 truncate">{text}</span>}
      </Button>
      {toggleSideBar && editAndDeleteIcon}
    </div>
  );
}

export default SideBtn;
