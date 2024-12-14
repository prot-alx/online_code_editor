"use client";

import { Card, CardHeader } from "../ui/card";
import { TASK_DESCRIPTION } from "@/constants";
import { Alert } from "../ui/alert";
import { memo } from "react";

// пришлось мемоизировать, иначе на мобильных устройствах страдала производительность, индекс LCP был красным
const TaskContent = memo(function TaskContent() {
  return (
    <Alert role="region" aria-label="Описание задачи">
      {TASK_DESCRIPTION.content}
    </Alert>
  );
});

export const TaskDescription = memo(function TaskDescription() {
  return (
    <section>
      <Card>
        <CardHeader>
          <h2 className="text-xl font-bold">{TASK_DESCRIPTION.title}</h2>
        </CardHeader>
        <TaskContent />
      </Card>
    </section>
  );
});
