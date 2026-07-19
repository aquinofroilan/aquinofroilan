import { ProjectsList } from '$lib/data/projects-list';
import { fetchImagesWithPrefix } from '$lib/server/actions/work-image';
import { error } from '@sveltejs/kit';

export const load = async ({ params }) => {
	const project = ProjectsList.find((p) => p.slug === params.slug);

	if (!project) {
		throw error(404, 'Project not found');
	}

	const { slug, title, longDescription, imgPrefix, projectLink } = project;
	const snapshotLinks = imgPrefix ? await fetchImagesWithPrefix(imgPrefix) : [];

	return {
		project: {
			slug,
			title,
			longDescription,
			imgPrefix,
			projectLink
		},
		snapshotLinks
	};
};
