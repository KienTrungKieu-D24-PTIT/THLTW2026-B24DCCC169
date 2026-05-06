import React, { useEffect } from 'react';
import { Modal, Form, Input, DatePicker, Select } from 'antd';
import dayjs from 'dayjs';
import { ITask } from '@/models/useTasks';

interface Props {
	visible: boolean;
	onCancel: () => void;
	onSave: (values: any, id?: string) => void;
	editingTask: ITask | null;
}

const TaskForm: React.FC<Props> = ({ visible, onCancel, onSave, editingTask }) => {
	const [form] = Form.useForm();

	useEffect(() => {
		if (editingTask) {
			form.setFieldsValue({ ...editingTask, deadline: dayjs(editingTask.deadline, 'YYYY-MM-DD') });
		} else {
			form.resetFields();
		}
	}, [editingTask, form, visible]);

	const handleSubmit = () => {
		form.validateFields().then((values) => {
			onSave(values, editingTask?.id);
			form.resetFields();
			onCancel();
		});
	};

	return (
		<Modal
			title={editingTask ? 'Chỉnh sửa Task' : 'Thêm Task Mới'}
			visible={visible}
			onOk={handleSubmit}
			onCancel={onCancel}
			destroyOnClose
		>
			<Form form={form} layout='vertical'>
				<Form.Item name='name' label='Tên công việc' rules={[{ required: true, message: 'Vui lòng nhập tên!' }]}>
					<Input />
				</Form.Item>
				<Form.Item name='description' label='Mô tả'>
					<Input.TextArea rows={3} />
				</Form.Item>
				<Form.Item name='deadline' label='Deadline' rules={[{ required: true, message: 'Vui lòng chọn ngày!' }]}>
					<DatePicker style={{ width: '100%' }} format='YYYY-MM-DD' />
				</Form.Item>
				<Form.Item name='priority' label='Mức độ ưu tiên' rules={[{ required: true }]}>
					<Select>
						<Select.Option value='Cao'>Cao</Select.Option>
						<Select.Option value='Trung bình'>Trung bình</Select.Option>
						<Select.Option value='Thấp'>Thấp</Select.Option>
					</Select>
				</Form.Item>
				<Form.Item name='tags' label='Tags'>
					<Select mode='tags' placeholder='Nhập tag và ấn Enter' />
				</Form.Item>
			</Form>
		</Modal>
	);
};

export default TaskForm;
