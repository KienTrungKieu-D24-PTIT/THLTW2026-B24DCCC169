import { useModel } from 'umi';
import { Table } from 'antd';

export default () => {
	const { soVanBang } = useModel('sovanbang');
	return (
		<>
			<Table
				dataSource={soVanBang}
				rowKey='id'
				columns={[
					{ title: 'Năm', dataIndex: 'nam' },
					{ title: 'Tên sổ', dataIndex: 'tenSo' },
					{ title: 'Số lượng đã cấp (Số vào sổ)', dataIndex: 'currentSoVaoSo' },
				]}
			/>
			<p>
				<i>* Ghi chú: Quản lý Sổ tự động qua Model.</i>
			</p>
		</>
	);
};
