import { getBlogPostById } from "$lib/server/actions/blog";
import { error } from "@sveltejs/kit";

export const load = async ({ params }) => {
    const post = await getBlogPostById(params.slug);

    if (!post) {
        throw error(404, "Blog post not found");
    }

    return { post };
};
