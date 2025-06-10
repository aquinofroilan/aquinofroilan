import { ArrowLeft } from "lucide-react";
import Link from "next/link";

const Blog = async ({ params }: { params: Promise<{ slug: string }> }) => {
    const slug = (await params).slug;
    return (
        <main className="py-10 w-11/12 max-w-5xl gap-2 flex flex-col md:grid md:grid-cols-2">
            <Link
                href={"/"}
                className="flex items-center gap-2 text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-200 transition duration-200"
            >
                <ArrowLeft size={15} />
                <h1 className="text-sm">Back</h1>
            </Link>
            <div className="grid place-content-center col-span-2 w-full h-full">
                <h1 className="text-2xl text-center font-bold">Blogs</h1>
                <p className="text-center text-neutral-500 dark:text-neutral-400">
                    This page is currently under construction. I am working on creating a blog section where I can share
                    my thoughts, experiences, and insights on various topics. Stay tuned for updates. In the meantime,
                    feel free to check out my other pages.
                </p>
                <p className="text-center text-neutral-500 dark:text-neutral-400">Slug: {slug}</p>
            </div>
        </main>
    );
};

export default Blog;
