import React from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import { Card, Tag } from 'antd';
import { ITask } from '@/models/useTasks';

interface Props {
	tasks: ITask[];
	updateTaskStatus: (id: string, status: ITask['status']) => void;
}

const KANBAN_COLUMNS: { id: ITask['status']; title: string }[] = [
	{ id: 'TODO', title: 'Cần làm' },
	{ id: 'IN_PROGRESS', title: 'Đang làm' },
	{ id: 'DONE', title: 'Hoàn thành' },
];

const KanbanBoard: React.FC<Props> = ({ tasks, updateTaskStatus }) => {
	const onDragEnd = (result: DropResult) => {
		if (!result.destination) return;
		if (result.source.droppableId !== result.destination.droppableId) {
			updateTaskStatus(result.draggableId, result.destination.droppableId as ITask['status']);
		}
	};

	return (
		<DragDropContext onDragEnd={onDragEnd}>
			<div style={{ display: 'flex', gap: '16px' }}>
				{KANBAN_COLUMNS.map((column) => {
					const columnTasks = tasks.filter((t) => t.status === column.id);
					return (
						<Droppable droppableId={column.id} key={column.id}>
							{(provided) => (
								<div
									{...provided.droppableProps}
									ref={provided.innerRef}
									style={{ background: '#f0f2f5', padding: 16, width: '33%', minHeight: 400, borderRadius: 8 }}
								>
									<h3 style={{ textAlign: 'center', marginBottom: 16 }}>
										{column.title} ({columnTasks.length})
									</h3>
									{columnTasks.map((item, index) => (
										<Draggable key={item.id} draggableId={item.id} index={index}>
											{(provided) => (
												<div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
													<Card size='small' style={{ marginBottom: 8 }}>
														<div style={{ fontWeight: 'bold' }}>{item.name}</div>
														<div style={{ fontSize: '12px', color: '#888', marginBottom: 8 }}>{item.deadline}</div>
														<div>
															<Tag
																color={
																	item.priority === 'Cao' ? 'red' : item.priority === 'Trung bình' ? 'orange' : 'green'
																}
															>
																{item.priority}
															</Tag>
															{item.tags?.map((tag) => (
																<Tag key={tag}>{tag}</Tag>
															))}
														</div>
													</Card>
												</div>
											)}
										</Draggable>
									))}
									{provided.placeholder}
								</div>
							)}
						</Droppable>
					);
				})}
			</div>
		</DragDropContext>
	);
};

export default KanbanBoard;
