import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  StarIcon as StarIconOutline,
  TagIcon,
} from "@heroicons/react/24/outline";

import DatePicker from "../DatePicker/DatePicker";
import { StarIcon, TrashIcon } from "@heroicons/react/24/solid";
import { Task } from "@prisma/client";

function TaskCard({ data }: { data: Task | undefined }) {
  const iconClassName = "size-6! inline-block";
  const BtnClassName = "rounded-full p-1.5 hover:bg-gray-200";

  return (
    <div>
      <div
        onClick={() => console.log("ttttteeeeesssssttttt")}
        className="fixed rounded-xl size-56 min-w"
      ></div>
      <Card className="size-56 min-w-56 gap-3 py-2 border-gray-400">
        <CardHeader className="mt-0.5 gap-2">
          <CardTitle className="h-5 truncate">{data?.title}</CardTitle>
          <CardDescription className="h-10 line-clamp-2">
            {data?.description}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <DatePicker taskDate={data?.date} />
          {/* Label Section */}
          <div className="h-7 mt-3.5 flex gap-1 items-center overflow-hidden">
            {data?.labels && data?.labels?.length > 1 ? (
              <>
                <LittleLabel className="truncate">
                  {data?.labels[0]}
                </LittleLabel>
                <LittleLabel className="rounded-none text-clip h-5! p-1! flex justify-center items-center">{`+${
                  data.labels.length - 1
                }`}</LittleLabel>
              </>
            ) : (
              data?.labels &&
              data?.labels?.length > 0 && (
                <LittleLabel className="truncate">
                  {data?.labels[0]}
                </LittleLabel>
              )
            )}
          </div>
        </CardContent>
        <CardFooter className=" justify-end">
          {data?.isImportant ? (
            <button className={BtnClassName}>
              <StarIcon className={`${iconClassName} text-yellow-500`} />
            </button>
          ) : (
            <button className={BtnClassName}>
              <StarIconOutline className={iconClassName} />
            </button>
          )}
          <button className={BtnClassName}>
            <TagIcon className={iconClassName} />
          </button>
          <button className={BtnClassName}>
            <TrashIcon className={iconClassName} />
          </button>
        </CardFooter>
      </Card>
    </div>
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
      className={`h-6 border border-black rounded-full px-2 py-1 text-xs font-semibold ${className}`}
    >
      {children}
    </div>
  );
}
