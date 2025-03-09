"use client";

import { Progress } from "@/components/ui/progress";
import { useEffect, useState } from "react";

function ProgressBarForDelete() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setProgress(100), 1000);
    return () => clearTimeout(timer);
  }, []);

  return <Progress value={progress} />;
}

export default ProgressBarForDelete;
