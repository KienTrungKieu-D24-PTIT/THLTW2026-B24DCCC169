import { useState, useEffect } from 'react';
import { useModel } from 'umi';
import { List, Card, Input, Tag, Space, Typography, Row, Col } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

const { Paragraph, Text, Title } = Typography;

export default ({ onViewPost }: any) => {
	const { posts } = useModel('blog');

	const [searchText, setSearchText] = useState('');
	const [debouncedText, setDebouncedText] = useState('');
	const [selectedTag, setSelectedTag] = useState<string | null>(null);

	useEffect(() => {
		const timer = setTimeout(() => setDebouncedText(searchText), 300);
		return () => clearTimeout(timer);
	}, [searchText]);

	const filteredPosts = posts.filter((post: any) => {
		if (post.status !== 'Đã đăng') return false;

		const matchText =
			post.title.toLowerCase().includes(debouncedText.toLowerCase()) ||
			post.summary.toLowerCase().includes(debouncedText.toLowerCase());
		const matchTag = selectedTag ? post.tags.includes(selectedTag) : true;

		return matchText && matchTag;
	});

	return (
		<div>
			<Row gutter={16} style={{ marginBottom: 24 }} align='middle'>
				<Col span={12}>
					<Input
						size='large'
						placeholder='Tìm kiếm bài viết...'
						prefix={<SearchOutlined />}
						value={searchText}
						onChange={(e) => setSearchText(e.target.value)}
						allowClear
					/>
				</Col>
				<Col span={12}>
					<Space>
						<Text strong>Lọc theo thẻ:</Text>
						{selectedTag && (
							<Tag closable color='blue' onClose={() => setSelectedTag(null)}>
								{selectedTag}
							</Tag>
						)}
						{!selectedTag && <Text type='secondary'>Chưa chọn thẻ nào</Text>}
					</Space>
				</Col>
			</Row>

			<List
				grid={{ gutter: 24, xs: 1, sm: 2, md: 3 }}
				pagination={{ pageSize: 9, position: 'bottom' }}
				dataSource={filteredPosts}
				renderItem={(item: any) => (
					<List.Item>
						<Card
							hoverable
							cover={<img alt={item.title} src={item.image} style={{ height: 200, objectFit: 'cover' }} />}
							onClick={() => onViewPost(item.id)}
							style={{ borderRadius: 8, overflow: 'hidden' }}
						>
							<Card.Meta
								title={
									<Title level={5} ellipsis={{ rows: 2 }}>
										{item.title}
									</Title>
								}
								description={
									<>
										<Paragraph type='secondary' ellipsis={{ rows: 3 }} style={{ minHeight: 66 }}>
											{item.summary}
										</Paragraph>
										<div style={{ marginBottom: 12 }}>
											{item.tags.map((tag: string) => (
												<Tag
													key={tag}
													color='cyan'
													style={{ cursor: 'pointer' }}
													onClick={(e) => {
														e.stopPropagation();
														setSelectedTag(tag);
													}}
												>
													{tag}
												</Tag>
											))}
										</div>
										<Space size='middle' style={{ fontSize: 12, color: '#8c8c8c' }}>
											<span> {item.createdAt}</span>
											<span>{item.views} lượt xem</span>
										</Space>
									</>
								}
							/>
						</Card>
					</List.Item>
				)}
			/>
		</div>
	);
};
