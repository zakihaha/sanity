import { BlogCard } from "@/app/interface";
import { client, urlFor } from "@/app/lib/sanity";
import Image from "next/image";

async function getData(slug: string) {
    const query = `
    *[_type == 'blog' && slug.current == '${slug}'] {
        title,
        description,
        "currentSlug": slug.current,
        coverImage
    }[0]`;

    const data = await client.fetch(query);

    return data;
}

const BlogDetail = async ({ params }: { params: { slug: string } }) => {
    const data: BlogCard = await getData(params.slug);

    return (
        <div>
            <Image src={urlFor(data.coverImage).url()} alt={data.title} width={200} height={200} />
            <h1>{data.title}</h1>
            <p>{data.description}</p>
        </div>
    );
};

export default BlogDetail;