"use client";
import { useQueryOne } from "@triplit/react";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { triplit } from "~/triplit/client";

export default function TodoPage() {
  const { id } = useParams();
  const query = triplit
    .query("todos")
    .Vars({ id: id }) // Allows access to the document with id 1234
    .Where("id", "=", id); // Filters to just the document with id 1234

  const { result: todo } = useQueryOne(triplit, query);

  const t = useTranslations("Todo");

  if (!todo) {
    return <div>{t("todoNotFound")}</div>;
  }

  return <div>{todo?.text}</div>;
}
