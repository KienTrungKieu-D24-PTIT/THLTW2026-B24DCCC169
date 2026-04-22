import { Card, Tabs } from 'antd';
import { useState } from 'react';
import TrangChu from './components/TrangChu';
import ChiTietBaiViet from './components/ChiTietBaiViet';
import GioiThieu from './components/GioiThieu';
import QuanTri from './components/QuanTri';

export default () => {
	const [currentView, setCurrentView] = useState<'home' | 'detail'>('home');
	const [selectedPostId, setSelectedPostId] = useState<string | null>(null);

	const handleViewPost = (id: string) => {
		setSelectedPostId(id);
		setCurrentView('detail');
	};

	const handleBackToHome = () => {
		setCurrentView('home');
		setSelectedPostId(null);
	};

	return (
		<Card bordered={false} style={{ minHeight: '85vh', background: '#f0f2f5' }}>
			{currentView === 'home' ? (
				<Tabs defaultActiveKey='1' type='card' size='large'>
					<Tabs.TabPane tab='Khám phá Blog' key='1'>
						<TrangChu onViewPost={handleViewPost} />
					</Tabs.TabPane>

					<Tabs.TabPane tab='Tác giả' key='2'>
						<GioiThieu />
					</Tabs.TabPane>

					<Tabs.TabPane tab='Quản trị hệ thống' key='3'>
						<QuanTri />
					</Tabs.TabPane>
				</Tabs>
			) : (
				<ChiTietBaiViet postId={selectedPostId} onBack={handleBackToHome} onViewPost={handleViewPost} />
			)}
		</Card>
	);
};
