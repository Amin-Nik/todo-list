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
        className={`bg-inherit hover:bg-sidebar-accent/50 text-inherit transition-all transition-discrete duration-300 h-12 w-12 justify-start gap-4 ${
          activeBtn == text &&
          "bg-sidebar-accent text-sidebar-accent-foreground"
        } ${toggleSideBar ? "w-full rounded-r-full! pl-6!" : "rounded-full"}`}
      >
        {icon}
        {toggleSideBar && (
          <>
            <span className="w-3/5 truncate">{text.trim()}</span>
            {activeBtn == text && (
              <Label className="flex justify-center items-center rounded-full p-1.5 bg-sidebar-foreground text-sidebar ">
                {taskCount}
              </Label>
            )}
          </>
        )}
      </Button>
      {toggleSideBar && editAndDeleteIcon}
    </div>
  );
}

export default SideBtn;
