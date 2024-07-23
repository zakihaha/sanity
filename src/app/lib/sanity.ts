import { createClient } from "next-sanity";
import ImageUrlBuilder from "@sanity/image-url";

export const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
    apiVersion: '2021-03-25',
    useCdn: process.env.NODE_ENV === 'production',
})

const builder = ImageUrlBuilder(client);

export function urlFor(source: any) {
    return builder.image(source);
}