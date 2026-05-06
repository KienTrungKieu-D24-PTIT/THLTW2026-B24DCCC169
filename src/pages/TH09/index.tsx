import React, { useState } from 'react';
import { Layout, Tabs, Button, Typography } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useModel } from 'umi';
import Dashboard from './components/Dashboard';
import CanbanBoard from './components/CanbanBoard';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import { ITask } from '@/models/useTasks';

const { Header, Content } = Layout;
const { Title } = Typography;

const TH09Page: React.FC = () => {
	const { tasks, saveTask, deleteTask, updateTaskStatus } = useModel('useTasks');
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [editingTask, setEditingTask] = useState<ITask | null>(null);

	const handleAddNew = () => {
		setEditingTask(null);
		setIsModalVisible(true);
	};

	const handleEdit = (task: ITask) => {
		setEditingTask(task);
		setIsModalVisible(true);
	};

	const items = [
		{ key: '1', label: 'Bảng Cần Làm', children: <CanbanBoard tasks={tasks} updateTaskStatus={updateTaskStatus} /> },
		{
			key: '2',
			label: 'Danh sách Task',
			children: <TaskList tasks={tasks} onEdit={handleEdit} onDelete={deleteTask} />,
		},
	];

	return (
		<Layout style={{ minHeight: '100vh', background: '#fff' }}>
			<Header
				style={{
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'space-between',
					background: '#fff',
					borderBottom: '1px solid #f0f0f0',
					padding: '0 24px',
				}}
			>
				<Title level={3} style={{ margin: 0 }}>
					Quản lý công việc
				</Title>
				<Button type='primary' icon={<PlusOutlined />} onClick={handleAddNew}>
					Thêm Task Mới
				</Button>
			</Header>

			<Content style={{ padding: '24px', maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
				<Dashboard tasks={tasks} />
				<Tabs defaultActiveKey='1'>
					{items.map((item) => (
						<Tabs.TabPane tab={item.label} key={item.key}>
							{item.children}
						</Tabs.TabPane>
					))}
				</Tabs>

				<TaskForm
					visible={isModalVisible}
					onCancel={() => setIsModalVisible(false)}
					onSave={saveTask}
					editingTask={editingTask}
				/>
			</Content>
		</Layout>
	);
};

export default TH09Page;
