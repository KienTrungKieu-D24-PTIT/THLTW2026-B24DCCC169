import { useEffect } from 'react';
import { useModel } from 'umi';
import { Button, Typography, Tag, Space, Divider, Card, Row, Col, Avatar } from 'antd';
import { ArrowLeftOutlined, UserOutlined } from '@ant-design/icons';
import ReactMarkdown from 'react-markdown';

const { Title, Paragraph, Text } = Typography;

export default ({ postId, onBack, onViewPost }: any) => {
	const { posts, incrementView, authorInfo } = useModel('blog');

	useEffect(() => {
		if (postId) {
			incrementView(postId);
			window.scrollTo(0, 0);
		}
	}, [postId]);

	const post = posts.find((p: any) => p.id === postId);
	if (!post) return <p>Không tìm thấy bài viết.</p>;

	const relatedPosts = posts
		.filter((p: any) => p.id !== postId && p.status === 'Đã đăng' && p.tags.some((t: string) => post.tags.includes(t)))
		.slice(0, 3);

	return (
		<div style={{ maxWidth: 900, margin: '0 auto', background: '#fff', padding: 32, borderRadius: 8 }}>
			<Button icon={<ArrowLeftOutlined />} onClick={onBack} style={{ marginBottom: 24 }}>
				Quay lại danh sách
			</Button>

			<Title level={1}>{post.title}</Title>

			<Space size='large' style={{ marginBottom: 24 }}>
				<Space>
					<Avatar src={authorInfo.avatar} icon={<UserOutlined />} />
					<Text strong>{post.author}</Text>
				</Space>
				<Text type='secondary'>Đăng ngày: {post.createdAt}</Text>
				<Text type='secondary'>Lượt xem: {post.views} (đã +1)</Text>
			</Space>

			<div style={{ marginBottom: 32 }}>
				{post.tags.map((tag: string) => (
					<Tag key={tag} color='blue'>
						{tag}
					</Tag>
				))}
			</div>

			<img
				src={post.image}
				alt='Cover'
				style={{ width: '100%', borderRadius: 8, marginBottom: 32, maxHeight: 400, objectFit: 'cover' }}
			/>

			<Typography>
				<div style={{ fontSize: 16, lineHeight: 1.8 }}>
					<ReactMarkdown>{post.content}</ReactMarkdown>
				</div>
			</Typography>

			<Divider />

			<Title level={4}>Bài viết liên quan</Title>
			<Row gutter={16}>
				{relatedPosts.length > 0 ? (
					relatedPosts.map((rp: any) => (
						<Col span={8} key={rp.id}>
							<Card hoverable size='small' onClick={() => onViewPost(rp.id)}>
								<Card.Meta
									title={rp.title}
									description={
										<Text type='secondary' ellipsis>
											{rp.summary}
										</Text>
									}
								/>
							</Card>
						</Col>
					))
				) : (
					<Col>
						<Text type='secondary'>Không có bài viết liên quan.</Text>
					</Col>
				)}
			</Row>
		</div>
	);
};
