import { Button } from "../ui/button";

function SideBtn({
  icon,
  text,
  clickHandler,
  editAndDeleteIcon,
  progressDelete,
}: {
  icon: React.ReactNode;
  text: string;
  addNew?: boolean;
  clickHandler?: React.MouseEventHandler<HTMLButtonElement>;
  editAndDeleteIcon?: React.ReactNode;
  progressDelete?: React.ReactNode;
}) {
  return (
    <div className="relative group">
      <Button
        onClick={clickHandler}
        className="transition transition-discrete w-full h-12 rounded-r-full justify-start gap-4"
      >
        {icon}
        <span className="w-3/5 truncate">{text}</span>
      </Button>
      {editAndDeleteIcon}
      {progressDelete}
    </div>
  );
}

export default SideBtn;
