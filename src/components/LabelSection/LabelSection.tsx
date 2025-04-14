import { TrashIcon, PencilIcon, TagIcon } from "@heroicons/react/24/solid";
import SideBtn from "../SideBtn/SideBtn";
import NewLabelDialog from "../NewLabelDialog/NewLabelDialog";
import { Button } from "../ui/button";
import DeleteLabelDialog from "../DeleteLabelDialog/DeleteLabelDialog";
import EditLabelDialog from "../EditLabelDialog/EditLabelDialog";

function LabelSection({
  labelData,
  activeBtn,
  setActiveBtn,
  toggleSideBar,
  taskCount,
}: {
  labelData: string[];
  activeBtn: string;
  setActiveBtn: React.Dispatch<React.SetStateAction<string>>;
  toggleSideBar: boolean;
  taskCount: number;
}) {
  return (
    <section>
      <NewLabelDialog
        labelData={labelData}
        triggerChild={
          <Button
            className={`${
              toggleSideBar
                ? "w-full! rounded-r-full pl-6! border-y-2 border-r-2"
                : "rounded-full border-2"
            } transition-all transition-discrete duration-300 h-12 w-12 justify-start gap-4 border-dashed border-white my-1`}
          >
            <TagIcon className="size-6! inline-block" />

            {toggleSideBar && (
              <span className="w-3/5 truncate">Add New Label</span>
            )}
          </Button>
        }
      />
      {labelData?.map((label, index) => (
        <SideBtn
          taskCount={taskCount}
          toggleSideBar={toggleSideBar}
          activeBtn={activeBtn}
          setActiveBtn={setActiveBtn}
          key={index}
          icon={<TagIcon className="size-6! inline-block" />}
          text={label}
          editAndDeleteIcon={
            <div className="bg-[#2f2f31] rounded-full transition transition-discrete absolute right-1 top-2.5 flex opacity-0 group-hover:opacity-100">
              <EditLabelDialog
                currentLabel={label}
                labelData={labelData}
                triggerChild={
                  <button className="transition transition-discrete flex justify-center items-center size-7 rounded-full p-1.5 hover:bg-gray-400">
                    <PencilIcon className="transition transition-discrete size-4 inline-block text-gray-300" />
                  </button>
                }
              />
              <DeleteLabelDialog
                setActiveBtn={setActiveBtn}
                currentLabel={label}
                labelData={labelData}
                triggerChild={
                  <button className="transition transition-discrete flex justify-center items-center size-7 rounded-full p-1.5 hover:bg-gray-400">
                    <TrashIcon className="transition transition-discrete size-4 inline-block text-gray-300" />
                  </button>
                }
              />
            </div>
          }
        />
      ))}
    </section>
  );
}

export default LabelSection;
