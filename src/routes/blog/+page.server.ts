import { getAllBlogPosts } from "$lib/server/actions/blog";

export const load = async () => {
    const posts = await getAllBlogPosts();
    return { posts };
};
