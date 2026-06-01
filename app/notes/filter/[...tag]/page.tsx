import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { fetchNotes } from "../../../../lib/api";
import NotesClient from "../../Notes.client";

interface FilterPageProps {
  params: Promise<{ tag: string[] }>;
}

export default async function FilterPage({ params }: FilterPageProps) {
  const { tag } = await params;
  const selectedTag = tag[0] === "all" ? undefined : tag[0];

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["notes", 1, "", selectedTag],
    queryFn: () => fetchNotes({ page: 1, perPage: 12, tag: selectedTag }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient tag={selectedTag} />
    </HydrationBoundary>
  );
}