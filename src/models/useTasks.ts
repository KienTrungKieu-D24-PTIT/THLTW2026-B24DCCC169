import { useState, useEffect } from 'react';
import dayjs from 'dayjs';

export interface ITask {
	id: string;
	name: string;
	description?: string;
	deadline: string;
	priority: 'Cao' | 'Trung bình' | 'Thấp';
	tags?: string[];
	status: 'TODO' | 'IN_PROGRESS' | 'DONE';
}

export default function useTasksModel() {
	const [tasks, setTasks] = useState<ITask[]>(() => {
		const saved = localStorage.getItem('kanban_tasks');
		return saved ? JSON.parse(saved) : [];
	});

	useEffect(() => {
		localStorage.setItem('kanban_tasks', JSON.stringify(tasks));
	}, [tasks]);

	const saveTask = (values: any, editingId?: string) => {
		const formattedTask = {
			...values,
			deadline: values.deadline.format('YYYY-MM-DD'),
		};

		if (editingId) {
			setTasks(tasks.map((t) => (t.id === editingId ? { ...t, ...formattedTask } : t)));
		} else {
			const newTask: ITask = {
				...formattedTask,
				id: Date.now().toString(),
				status: 'TODO',
			};
			setTasks([...tasks, newTask]);
		}
	};

	const deleteTask = (id: string) => setTasks(tasks.filter((t) => t.id !== id));

	const updateTaskStatus = (taskId: string, newStatus: ITask['status']) => {
		setTasks(tasks.map((t) => (t.id === taskId ? { ...t, status: newStatus } : t)));
	};

	return { tasks, saveTask, deleteTask, updateTaskStatus };
}
