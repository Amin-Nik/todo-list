import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import DatePicker from "../DatePicker/DatePicker";
import { StarIcon, TrashIcon } from "@heroicons/react/24/solid";
import { Task } from "@prisma/client";
import {
  StarIcon as StarIconOutline,
  TagIcon,
} from "@heroicons/react/24/outline";

function TaskCard({ data }: { data: Task | undefined }) {
  const iconClassName = "size-6! inline-block";
  const BtnClassName = "rounded-full p-1.5 hover:bg-gray-200";

  return (
    <Card className="min-w-64 max-w-64 h-fit gap-4 py-2">
      <CardHeader className="mt-1 gap-2">
        <CardTitle className="h-5 truncate">{data?.title}</CardTitle>
        <CardDescription className="min-h-fit max-h-14 line-clamp-3">
          {data?.description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <DatePicker taskDate={data?.date} />
        <div className="mt-3.5 flex flex-wrap gap-1">
          {data?.labels.map((Label, index) => (
            <LittleLabel key={index} text={Label} />
          ))}
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
  );
}

export default TaskCard;

function LittleLabel({ text }: { text: string }) {
  return (
    <div className="max-h-6 max-w-full border border-black rounded-full px-2 py-1 size-fit text-xs font-semibold truncate">
      {text}
    </div>
  );
}
