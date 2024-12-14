"use client";
import { Card, CardHeader, Alert } from "../ui";
import { TASK_DESCRIPTION } from "@/constants";

export const TaskDescription = () => {
  return (
    <section>
      <Card>
        <CardHeader>
          <h2 className="text-xl font-bold">{TASK_DESCRIPTION.title}</h2>
        </CardHeader>
        <Alert role="region" aria-label="Описание задачи">
          {TASK_DESCRIPTION.content}
        </Alert>
      </Card>
    </section>
  );
};
