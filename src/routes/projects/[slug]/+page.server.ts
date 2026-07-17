import { ProjectsList } from "$lib/data/projects-list";
import { fetchImagesWithPrefix } from "$lib/server/actions/work-image";
import { error } from "@sveltejs/kit";

export const load = async ({ params }) => {
    const project = ProjectsList.find((p) => p.slug === params.slug);

    if (!project) {
        throw error(404, "Project not found");
    }

    const { title, longDescription, imgPrefix, projectLink, techStackEntries } = project;
    const snapshotLinks = imgPrefix ? await fetchImagesWithPrefix(imgPrefix) : [];

    return {
        project: {
            title,
            longDescription,
            imgPrefix,
            projectLink,
            techStackEntries
        },
        snapshotLinks
    };
};
