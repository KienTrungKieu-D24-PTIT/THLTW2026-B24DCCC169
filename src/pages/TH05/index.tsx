import { Card, Tabs } from 'antd';
import CauLacBoTab from './components/CauLacBoTab';
import DonDangKyTab from './components/DonDangKyTab';
import ThanhVienTab from './components/ThanhVienTab';
import ThongKeTab from './components/ThongKeTab';

const { TabPane } = Tabs;

const QuanLyHeThongCLB = () => {
	return (
		<Card title='Bài thực hành 05: Hệ thống quản lý câu lạc bộ'>
			<Tabs defaultActiveKey='1'>
				<TabPane tab='1. Danh sách CLB' key='1'>
					<CauLacBoTab />
				</TabPane>
				<TabPane tab='2. Quản lý Đơn đăng ký' key='2'>
					<DonDangKyTab />
				</TabPane>
				<TabPane tab='3. Quản lý Thành viên' key='3'>
					<ThanhVienTab />
				</TabPane>
				<TabPane tab='4. Báo cáo & Thống kê' key='4'>
					<ThongKeTab />
				</TabPane>
			</Tabs>
		</Card>
	);
};

export default QuanLyHeThongCLB;
