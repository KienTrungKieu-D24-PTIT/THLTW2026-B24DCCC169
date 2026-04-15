import { Row, Col, Input, Select, Button } from 'antd';

const { Option } = Select;

export default ({ setTuKhoa, setLocTrangThai, openModal }: any) => {
	return (
		<Row gutter={16} style={{ marginBottom: 20 }}>
			<Col span={8}>
				<Input.Search
					placeholder='Tìm theo Mã đơn hoặc Tên khách...'
					allowClear
					onSearch={setTuKhoa}
					onChange={(e) => setTuKhoa(e.target.value)}
				/>
			</Col>
			<Col span={8}>
				<Select defaultValue='Tất cả' onChange={setLocTrangThai} style={{ width: '100%' }}>
					<Option value='Tất cả'>Tất cả trạng thái</Option>
					<Option value='Chờ xác nhận'>Chờ xác nhận</Option>
					<Option value='Đang giao'>Đang giao</Option>
					<Option value='Hoàn thành'>Hoàn thành</Option>
					<Option value='Hủy'>Hủy</Option>
				</Select>
			</Col>
			<Col span={8} style={{ textAlign: 'right' }}>
				<Button type='primary' onClick={() => openModal()}>
					+ Thêm đơn hàng
				</Button>
			</Col>
		</Row>
	);
};
