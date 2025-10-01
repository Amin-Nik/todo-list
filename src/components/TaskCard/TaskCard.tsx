import {
  Card,
  CardTitle,
  CardFooter,
  CardHeader,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { Task } from "@prisma/client";
import DatePicker from "../DatePicker/DatePicker";
import { StarIcon } from "@heroicons/react/24/solid";
import TaskExpandDialog from "../TaskExpandDialog/TaskExpandDialog";
import { StarIcon as StarIconOutline } from "@heroicons/react/24/outline";

function TaskCard({ data, labels }: { data: Task; labels: string[] }) {
  return (
    <>
      {data && (
        <TaskExpandDialog
          newTask={false}
          labels={labels}
          data={data}
          triggerChild={
            <Card className="cursor-pointer bg-card text-card-foreground h-44 w-60 min-w-60 justify-evenly gap-0 py-0 border-ring inset-shadow-sm">
              <CardHeader className="mt-0.5 gap-2 px-4 bg-inherit">
                <CardTitle className="h-5 truncate">{data.title}</CardTitle>
                <CardDescription className="max-h-10 line-clamp-2">
                  {data.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="shadow-[inset_0_10px_10px_-12px_rgba(0,0,0,0.6),inset_0_-10px_10px_-12px_rgba(0,0,0,0.6)] h-7 flex gap-2 items-center overflow-hidden py-5 px-3 bg-inherit">
                {/* Label Section */}
                {data.labels && data.labels.length > 1 ? (
                  <>
                    <LittleLabel className="truncate">
                      {data.labels[0]}
                    </LittleLabel>
                    <LittleLabel className="rounded-none text-clip h-5! p-1! flex justify-center items-center">{`+${
                      data.labels.length - 1
                    }`}</LittleLabel>
                  </>
                ) : (
                  data.labels &&
                  data.labels.length > 0 && (
                    <LittleLabel className="truncate">
                      {data.labels[0]}
                    </LittleLabel>
                  )
                )}
                {/* End Of Label Section */}
              </CardContent>
              <CardFooter className="justify-around px-4 bg-inherit">
                <DatePicker
                  isDisabled={true}
                  taskDate={data.date == null ? undefined : data.date}
                />
                {data.isImportant ? (
                  <button className="cursor-pointer">
                    <StarIcon className="size-6! inline-block" />
                  </button>
                ) : (
                  <button className="cursor-pointer">
                    <StarIconOutline className="size-6! inline-block" />
                  </button>
                )}
              </CardFooter>
            </Card>
          }
        />
      )}
    </>
  );
}

export default TaskCard;

function LittleLabel({
  children,
  className,
}: {
  children: string;
  className?: string;
}) {
  return (
    <div
      className={`border border-foreground rounded-full px-2 py-1 text-xs font-semibold ${className}`}
    >
      {children}
    </div>
  );
}
