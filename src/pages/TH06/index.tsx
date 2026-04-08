import { Card, Tabs } from 'antd';
import KhamPhaTab from './components/KhamPhaTab';
import LichTrinhTab from './components/LichTrinhTab';
import NganSachTab from './components/NganSachTab';
import AdminTab from './components/AdminTab';

const { TabPane } = Tabs;

const UngDungDuLich = () => {
	return (
		<Card title='Bài thực hành 06: Ứng dụng Lập kế hoạch Du lịch'>
			<Tabs defaultActiveKey='1' type='card'>
				<TabPane tab='1. Khám phá Điểm đến' key='1'>
					<KhamPhaTab />
				</TabPane>
				<TabPane tab='2. Lịch trình của tôi' key='2'>
					<LichTrinhTab />
				</TabPane>
				<TabPane tab='3. Quản lý Ngân sách' key='3'>
					<NganSachTab />
				</TabPane>
				<TabPane tab='4. Trang Quản trị' key='4'>
					<AdminTab />
				</TabPane>
			</Tabs>
		</Card>
	);
};

export default UngDungDuLich;
