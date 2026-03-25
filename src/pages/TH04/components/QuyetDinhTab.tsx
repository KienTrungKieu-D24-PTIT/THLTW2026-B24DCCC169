import { useModel } from 'umi';
import { Table } from 'antd';

export default () => {
	const { quyetDinh } = useModel('quyetdinh');
	return (
		<Table
			dataSource={quyetDinh}
			rowKey='id'
			columns={[
				{ title: 'Số QĐ', dataIndex: 'soQD' },
				{ title: 'Ngày ban hành', dataIndex: 'ngayBanHanh' },
				{ title: 'Năm Sổ', dataIndex: 'namSo' },
				{ title: 'Lượt tra cứu', dataIndex: 'luotTraCuu' },
			]}
		/>
	);
};
