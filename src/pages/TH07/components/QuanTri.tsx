import { Tabs } from 'antd';
import QuanLyBaiViet from './QuanLyBaiViet';
import QuanLyThe from './QuanLyThe';

export default () => {
	return (
		<div style={{ background: '#fff', padding: 24, borderRadius: 8 }}>
			<Tabs defaultActiveKey='posts'>
				<Tabs.TabPane tab='Quản lý Bài viết' key='posts'>
					<QuanLyBaiViet />
				</Tabs.TabPane>

				<Tabs.TabPane tab='Quản lý Thẻ (Tags)' key='tags'>
					<QuanLyThe />
				</Tabs.TabPane>
			</Tabs>
		</div>
	);
};
