"use client";
import { memo } from "react";
import { Card, CardHeader, Alert } from "../ui";
import { TASK_DESCRIPTION } from "@/constants";

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
