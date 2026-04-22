import { useState } from 'react';

export default () => {
	const [tags, setTags] = useState([
		{ id: 't1', name: 'ReactJS' },
		{ id: 't2', name: 'NodeJS' },
		{ id: 't3', name: 'Kinh nghiệm IT' },
	]);

	const authorInfo = {
		name: 'Kiều Trung Kiên',
		avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Nam',
		bio: 'Một lập trình viên đam mê khám phá công nghệ mới. Luôn thích chia sẻ kiến thức thông qua những dòng code.',
		skills: ['React', 'UmiJS', 'Ant Design', 'TypeScript', 'NodeJS'],
		social: { github: 'https://github.com/kienkun-ptit', email: 'kienkun@ptit.edu.vn' },
	};
	const [posts, setPosts] = useState(
		Array.from({ length: 11 }).map((_, i) => ({
			id: `p${i + 1}`,
			title: `Bài viết mẫu số ${i + 1}: Hành trình trở thành Web Developer`,
			slug: `bai-viet-mau-${i + 1}`,
			summary: `Đây là đoạn tóm tắt cho bài viết số ${i + 1}. Một chặng đường dài đầy thú vị...`,
			content: `## Chào mừng đến với bài viết số ${i + 1} \n\nHelooo*.\n\n\`\`\`javascript\n"Hello ;\n\`\`\``,
			image: `https://picsum.photos/seed/${i + 1}/400/200`,
			tags: i % 2 === 0 ? ['ReactJS'] : ['NodeJS', 'Kinh nghiệm IT'],
			status: i === 10 ? 'Nháp' : 'Đã đăng',
			views: Math.floor(Math.random() * 500),
			createdAt: new Date(Date.now() - i * 86400000).toISOString().split('T')[0],
			author: authorInfo.name,
		})),
	);

	const addPost = (val: any) =>
		setPosts([
			{
				...val,
				id: 'p' + Date.now(),
				views: 0,
				createdAt: new Date().toISOString().split('T')[0],
				author: authorInfo.name,
			},
			...posts,
		]);
	const updatePost = (val: any) => setPosts(posts.map((p) => (p.id === val.id ? val : p)));
	const deletePost = (id: string) => setPosts(posts.filter((p) => p.id !== id));
	const incrementView = (id: string) => setPosts(posts.map((p) => (p.id === id ? { ...p, views: p.views + 1 } : p)));

	const addTag = (val: any) => setTags([...tags, { ...val, id: 't' + Date.now() }]);
	const updateTag = (val: any) => setTags(tags.map((t) => (t.id === val.id ? val : t)));
	const deleteTag = (id: string) => setTags(tags.filter((t) => t.id !== id));

	return {
		tags,
		addTag,
		updateTag,
		deleteTag,
		posts,
		addPost,
		updatePost,
		deletePost,
		incrementView,
		authorInfo,
	};
};
