import Image from "next/image";
import { BlogCard } from "./interface";
import { client, urlFor } from "./lib/sanity";
import Link from "next/link";

async function getData() {
  const query = `
    *[_type == 'blog'] | order(_createdAt desc) {
      title,
      description,
      "currentSlug": slug.current,
      coverImage
  }`;

  const data = await client.fetch(query);

  return data;
}

const Home = async () => {
  const data: BlogCard[] = await getData();

  console.log(data);
  return (
    <div>
      <h1>Blog</h1>
      {
        data.map((blog, index) => (
          <div key={index}>
            <Image src={urlFor(blog.coverImage).url()} alt={blog.title} width={200} height={200} />
            <h2>{blog.title}</h2>
            <p>{blog.description}</p>
            <Link href={`/blog/${blog.currentSlug}`}>
              Read more
            </Link>
          </div>
        ))
      }
    </div>
  );
}

export default Home;