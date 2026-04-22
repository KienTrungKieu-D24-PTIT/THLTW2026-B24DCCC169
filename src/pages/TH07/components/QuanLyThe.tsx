import { useModel } from 'umi';
import { Table, Button, Popconfirm } from 'antd';

export default () => {
	const { tags, posts, addTag, deleteTag } = useModel('blog');

	const tagColumns = [
		{ title: 'Tên thẻ', dataIndex: 'name' },
		{
			title: 'Số bài viết đang dùng',
			render: (_: any, record: any) => posts.filter((p: any) => p.tags.includes(record.name)).length,
		},
		{
			title: 'Hành động',
			render: (_: any, record: any) => (
				<Popconfirm title='Xóa thẻ này?' onConfirm={() => deleteTag(record.id)}>
					<Button danger type='link'>
						Xóa
					</Button>
				</Popconfirm>
			),
		},
	];

	const handleAddTag = () => {
		const newTag = prompt('Nhập tên thẻ mới:');
		if (newTag) addTag({ name: newTag });
	};

	return (
		<>
			<Button type='primary' style={{ marginBottom: 16 }} onClick={handleAddTag}>
				+ Thêm thẻ mới
			</Button>
			<Table dataSource={tags} columns={tagColumns} rowKey='id' pagination={false} />
		</>
	);
};
