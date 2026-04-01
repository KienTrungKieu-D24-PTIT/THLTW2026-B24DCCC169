import { useModel } from 'umi';
import { Card, Row, Col, Statistic } from 'antd';

export default () => {
	const { clbs } = useModel('caulacbo');
	const { dons } = useModel('dondangky');

	const pending = dons.filter((d: any) => d.trangThai === 'Pending').length;
	const approved = dons.filter((d: any) => d.trangThai === 'Approved').length;
	const rejected = dons.filter((d: any) => d.trangThai === 'Rejected').length;

	const renderCSSChart = () => {
		return (
			<div
				style={{
					display: 'flex',
					gap: '40px',
					alignItems: 'flex-end',
					height: '250px',
					marginTop: 30,
					borderBottom: '2px solid #ddd',
					paddingBottom: 10,
				}}
			>
				{clbs.map((clb: any) => {
					// ĐÃ SỬA: Thêm (d: any)
					const clbDons = dons.filter((d: any) => d.clbId === clb.id);
					const p = clbDons.filter((d: any) => d.trangThai === 'Pending').length;
					const a = clbDons.filter((d: any) => d.trangThai === 'Approved').length;
					const r = clbDons.filter((d: any) => d.trangThai === 'Rejected').length;
					const max = Math.max(dons.length, 1); // Tránh chia 0

					return (
						<div
							key={clb.id}
							style={{
								display: 'flex',
								gap: '5px',
								alignItems: 'flex-end',
								position: 'relative',
								width: '80px',
								justifyContent: 'center',
							}}
						>
							<div
								style={{
									height: `${(p / max) * 200}px`,
									width: '20px',
									backgroundColor: '#faad14',
									borderRadius: '4px 4px 0 0',
								}}
								title={`Pending: ${p}`}
							/>
							<div
								style={{
									height: `${(a / max) * 200}px`,
									width: '20px',
									backgroundColor: '#52c41a',
									borderRadius: '4px 4px 0 0',
								}}
								title={`Approved: ${a}`}
							/>
							<div
								style={{
									height: `${(r / max) * 200}px`,
									width: '20px',
									backgroundColor: '#f5222d',
									borderRadius: '4px 4px 0 0',
								}}
								title={`Rejected: ${r}`}
							/>
							<div style={{ position: 'absolute', bottom: '-30px', whiteSpace: 'nowrap', fontSize: '12px' }}>
								{clb.ten.slice(0, 10)}...
							</div>
						</div>
					);
				})}
			</div>
		);
	};

	return (
		<>
			<Row gutter={16}>
				<Col span={6}>
					<Card>
						<Statistic title='Tổng số CLB' value={clbs?.length || 0} />
					</Card>
				</Col>
				<Col span={6}>
					<Card>
						<Statistic title='Đơn Pending' value={pending} valueStyle={{ color: '#faad14' }} />
					</Card>
				</Col>
				<Col span={6}>
					<Card>
						<Statistic title='Đơn Approved' value={approved} valueStyle={{ color: '#52c41a' }} />
					</Card>
				</Col>
				<Col span={6}>
					<Card>
						<Statistic title='Đơn Rejected' value={rejected} valueStyle={{ color: '#f5222d' }} />
					</Card>
				</Col>
			</Row>

			<Card title='Biểu đồ: Số đơn đăng ký theo từng CLB' style={{ marginTop: 24 }}>
				<div style={{ display: 'flex', gap: 15, marginBottom: 10 }}>
					<span style={{ color: '#faad14' }}>■ Pending</span>
					<span style={{ color: '#52c41a' }}>■ Approved</span>
					<span style={{ color: '#f5222d' }}>■ Rejected</span>
				</div>
				{renderCSSChart()}
			</Card>
		</>
	);
};
