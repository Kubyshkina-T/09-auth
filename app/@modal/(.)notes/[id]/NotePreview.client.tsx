"use client";
import css from "@/components/NotePreview/NotePreview.module.css";

import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api";
import Modal from "@/components/Modal/Modal";

type Props = {
  id: string;
};

export default function NotePreview({ id }: Props) {
  const router = useRouter();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
    enabled: !!id,
    refetchOnMount: false,
  });

  return (
    <Modal onClose={() => router.back()}>

      {isLoading && <p>Loading...</p>}
      {isError && <p>Could not load note details.</p>}

      {data && (
        <div className={css.container}>
          <button className={css.backBtn} onClick={() => router.back()}>
            Close
          </button>
          <h2 className={css.h2}>{data.title}</h2>
          <p className={css.content}>{data.content}</p>
          <span className={css.tag}>{data.tag}</span>
          <p className={css.date}>{data.createdAt }</p>
        </div>
      )}
    </Modal>
  );
}