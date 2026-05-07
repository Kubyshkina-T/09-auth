import NotesClient from "./Notes.client";
import { fetchNotes } from "@/lib/api";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import {Metadata} from "next"

type Props = {
    params: Promise<{ slug: string[] }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata>{
    const { slug } = await params;
    const filter = slug[0] === "all" ? "All notes" : slug[0];
    return {
        title: ` Notes: ${filter}`,
        description: `Notes filtered by ${filter}.`,
        openGraph: {
            title: ` Notes: ${filter}`,
            description: `Notes filtered by ${filter}.`,
            url: `/notes/filter/${slug.join("/")}`,
            images: [{
                url: "/notehub-og-meta.jpg",
                width: 1200,
                height: 630,
                alt: "NoteHub preview image",
            },
            ],
        },
    };
}

const NotesByCategory = async ({params}: Props) => {
    const { slug } = await params;
    const tag = slug[0] === 'all' ? undefined : slug[0];
    const queryClient = new QueryClient;

    await queryClient.prefetchQuery({
        queryKey: ["notes", 1, "", tag],
        queryFn: ()=> fetchNotes(1, 12, "",tag),
    })
    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <NotesClient tag={tag}/>
        </HydrationBoundary>
    );
};

export default NotesByCategory;
