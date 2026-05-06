import React from 'react';
import { Card, Col, Row, Statistic } from 'antd';
import dayjs from 'dayjs';
import { ITask } from '@/models/useTasks';

interface Props {
	tasks: ITask[];
}

const Dashboard: React.FC<Props> = ({ tasks }) => {
	const totalTasks = tasks.length;
	const completedTasks = tasks.filter((t) => t.status === 'DONE').length;
	const overdueTasks = tasks.filter((t) => t.status !== 'DONE' && dayjs(t.deadline).isBefore(dayjs(), 'day')).length;

	return (
		<Row gutter={16} style={{ marginBottom: 24 }}>
			<Col span={8}>
				<Card>
					<Statistic title='Tổng số Task' value={totalTasks} />
				</Card>
			</Col>
			<Col span={8}>
				<Card>
					<Statistic title='Đã hoàn thành' value={completedTasks} valueStyle={{ color: '#3f8600' }} />
				</Card>
			</Col>
			<Col span={8}>
				<Card>
					<Statistic title='Quá hạn' value={overdueTasks} valueStyle={{ color: '#cf1322' }} />
				</Card>
			</Col>
		</Row>
	);
};

export default Dashboard;
