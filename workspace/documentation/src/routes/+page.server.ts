import type Docs from '$lib/Docs.svelte';
import type { ComponentProps } from 'svelte';
import { traverse } from 'marqua/fs';

export const prerender = true;

export const load: import('./$types').PageServerLoad = async () => {
	const docs: ComponentProps<Docs>['sections'] = traverse(
		{ entry: '../../content' },
		({ breadcrumb: [filename], content, frontMatter: { title, ...rest } }) => {
			if (filename.includes('draft')) return;
			const path = `content/${filename}`;
			const [, index, slug] = /^(\d{2})-(.+).md$/.exec(filename) || [];
			return { index, slug, title, ...rest, content, path };
		}
	);

	return { docs };
};
