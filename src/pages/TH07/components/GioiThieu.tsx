import { useModel } from 'umi';
import { Card, Avatar, Typography, Row, Col, Tag, Divider } from 'antd';
import { UserOutlined, GithubOutlined, MailOutlined } from '@ant-design/icons';

const { Title, Paragraph, Text } = Typography;

export default () => {
	const { authorInfo } = useModel('blog');

	return (
		<Card style={{ maxWidth: 800, margin: '0 auto', marginTop: 20, borderRadius: 8 }}>
			<Row gutter={24} align='middle'>
				<Col>
					<Avatar size={120} src={authorInfo.avatar} icon={<UserOutlined />} />
				</Col>
				<Col flex='auto'>
					<Title level={2} style={{ marginBottom: 0 }}>
						{authorInfo.name}
					</Title>
					<Text type='secondary'>Web Developer & Tech Blogger</Text>
					<Paragraph style={{ marginTop: 16 }}>{authorInfo.bio}</Paragraph>
				</Col>
			</Row>

			<Divider />

			<Title level={4}>Kỹ năng chuyên môn</Title>
			<div style={{ marginBottom: 24 }}>
				{authorInfo.skills.map((skill: string) => (
					<Tag color='geekblue' key={skill} style={{ padding: '4px 10px', fontSize: 14, marginBottom: 8 }}>
						{skill}
					</Tag>
				))}
			</div>

			<Title level={4}>Liên hệ mạng xã hội</Title>
			<Paragraph>
				<GithubOutlined style={{ marginRight: 8 }} />{' '}
				<a href={authorInfo.social.github} target='_blank' rel='noreferrer'>
					GitHub
				</a>
				<br />
				<MailOutlined style={{ marginRight: 8, marginTop: 12 }} />{' '}
				<a href={`mailto:${authorInfo.social.email}`}>{authorInfo.social.email}</a>
			</Paragraph>
		</Card>
	);
};
