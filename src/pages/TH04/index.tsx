import { Card, Tabs } from 'antd';
import SoVanBangTab from './components/SoVanBangTab';
import QuyetDinhTab from './components/QuyetDinhTab';
import CauHinhTab from './components/CauHinhTab';
import VanBangTab from './components/VanBangTab';
import TraCuuTab from './components/TraCuuTab';

const { TabPane } = Tabs;

const QuanLyVanBang = () => {
	return (
		<Card title='Bài thực hành 04: Hệ thống Quản lý Sổ văn bằng'>
			<Tabs defaultActiveKey='4'>
				<TabPane tab='1. Sổ văn bằng' key='1'>
					<SoVanBangTab />
				</TabPane>
				<TabPane tab='2. Quyết định TN' key='2'>
					<QuyetDinhTab />
				</TabPane>
				<TabPane tab='3. Cấu hình biểu mẫu' key='3'>
					<CauHinhTab />
				</TabPane>
				<TabPane tab='4. Thông tin văn bằng' key='4'>
					<VanBangTab />
				</TabPane>
				<TabPane tab='5. Tra cứu' key='5'>
					<TraCuuTab />
				</TabPane>
			</Tabs>
		</Card>
	);
};

export default QuanLyVanBang;
