import { TrashIcon, PencilIcon, TagIcon } from "@heroicons/react/24/solid";
import SideBtn from "../SideBtn/SideBtn";
import NewLabelDialog from "../NewLabelDialog/NewLabelDialog";
import { Button } from "../ui/button";
import DeleteLabelDialog from "../DeleteLabelDialog/DeleteLabelDialog";
import EditLabelDialog from "../EditLabelDialog/EditLabelDialog";

function LabelSection({
  labelData,
  filterByLabelEvent,
}: {
  labelData: string[];
  filterByLabelEvent: (label: string) => void;
}) {
  return (
    <section>
      <NewLabelDialog
        labelData={labelData}
        triggerChild={
          <Button className="w-full h-12 rounded-r-full justify-start gap-8 border-y-2 border-r-2 border-dashed border-white my-1">
            <TagIcon className="size-6! inline-block ml-2" />
            Add New Label
          </Button>
        }
      />
      {labelData?.map((label, index) => (
        <SideBtn
          clickHandler={() => filterByLabelEvent(label)}
          key={index}
          icon={<TagIcon className="size-6! inline-block ml-2" />}
          text={label}
          editAndDeleteIcon={
            <div className="transition transition-discrete absolute right-1 top-2.5 flex opacity-0 group-hover:opacity-100">
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
