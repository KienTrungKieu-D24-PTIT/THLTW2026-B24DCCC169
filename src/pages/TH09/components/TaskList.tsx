import React, { useState } from 'react';
import { Table, Tag, Space, Button, Input, Popconfirm } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import { ITask } from '@/models/useTasks';

const { Search } = Input;

interface Props {
	tasks: ITask[];
	onEdit: (task: ITask) => void;
	onDelete: (id: string) => void;
}

const TaskList: React.FC<Props> = ({ tasks, onEdit, onDelete }) => {
	const [searchText, setSearchText] = useState('');

	const columns: ColumnsType<ITask> = [
		{ title: 'Tên Task', dataIndex: 'name', key: 'name', render: (text) => <strong>{text}</strong> },
		{
			title: 'Trạng thái',
			dataIndex: 'status',
			key: 'status',
			filters: [
				{ text: 'Cần làm', value: 'TODO' },
				{ text: 'Đang làm', value: 'IN_PROGRESS' },
				{ text: 'Hoàn thành', value: 'DONE' },
			],
			onFilter: (value, record) => record.status === value,
			render: (status: ITask['status']) => {
				const color = status === 'DONE' ? 'green' : status === 'IN_PROGRESS' ? 'blue' : 'default';
				const text = status === 'DONE' ? 'Hoàn thành' : status === 'IN_PROGRESS' ? 'Đang làm' : 'Cần làm';
				return <Tag color={color}>{text}</Tag>;
			},
		},
		{
			title: 'Deadline',
			dataIndex: 'deadline',
			key: 'deadline',
			sorter: (a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime(),
		},
		{
			title: 'Ưu tiên',
			dataIndex: 'priority',
			key: 'priority',
			render: (priority) => (
				<Tag color={priority === 'Cao' ? 'red' : priority === 'Trung bình' ? 'orange' : 'green'}>{priority}</Tag>
			),
		},
		{
			title: 'Hành động',
			key: 'action',
			render: (_, record) => (
				<Space size='middle'>
					<Button type='text' icon={<EditOutlined />} onClick={() => onEdit(record)} />
					<Popconfirm title='Bạn có chắc muốn xóa?' onConfirm={() => onDelete(record.id)}>
						<Button type='text' danger icon={<DeleteOutlined />} />
					</Popconfirm>
				</Space>
			),
		},
	];

	const filteredTasks = tasks.filter((t) => t.name.toLowerCase().includes(searchText.toLowerCase()));

	return (
		<div>
			<Search
				placeholder='Tìm kiếm theo tên task...'
				allowClear
				onChange={(e) => setSearchText(e.target.value)}
				style={{ width: 300, marginBottom: 16 }}
			/>
			<Table dataSource={filteredTasks} columns={columns} rowKey='id' pagination={{ pageSize: 5 }} />
		</div>
	);
};

export default TaskList;
