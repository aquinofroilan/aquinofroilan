import { getCredlyCertifications } from "$lib/server/actions/credly";

export const load = async () => {
    const credlyCerts = await getCredlyCertifications();
    return { credlyCerts };
};
