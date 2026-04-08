import { useModel } from 'umi';
import { Card, Row, Col, Select, Space, Button, notification, Modal, Form, DatePicker } from 'antd';
import { useState } from 'react';

const { Option } = Select;

export default () => {
  const { diemDens } = useModel('diemden');
  const { themVaoLichTrinh } = useModel('lichtrinh');
  
  const [loaiHinh, setLoaiHinh] = useState<string>('Tất cả');
  const [sapXep, setSapXep] = useState<string>('Mặc định');
  const [modalVisible, setModalVisible] = useState(false);
  const [diemChon, setDiemChon] = useState<any>(null);
  const [form] = Form.useForm();

  let dataHienThi = diemDens.filter((d: any) => loaiHinh === 'Tất cả' || d.loaiHinh === loaiHinh);
  if (sapXep === 'GiaTang') {
    dataHienThi.sort((a: any, b: any) => (a.chiPhi.anUong + a.chiPhi.diChuyen + a.chiPhi.luuTru) - (b.chiPhi.anUong + b.chiPhi.diChuyen + b.chiPhi.luuTru));
  } else if (sapXep === 'DanhGiaCao') {
    dataHienThi.sort((a: any, b: any) => b.danhGia - a.danhGia);
  }

  const moFormThem = (diem: any) => {
    setDiemChon(diem);
    form.resetFields();
    setModalVisible(true);
  };

  const handleThem = (values: any) => {
    const ngayDinhDang = values.ngay.format('DD/MM/YYYY');
    
    themVaoLichTrinh(diemChon, ngayDinhDang);
    notification.success({ message: `Đã thêm ${diemChon.ten} vào ngày ${ngayDinhDang}` });
    setModalVisible(false);
  };

  return (
    <>
      <Space style={{ marginBottom: 20 }} wrap>
        <span>Lọc loại hình:</span>
        <Select value={loaiHinh} onChange={setLoaiHinh} style={{ width: 120 }}>
          <Option value="Tất cả">Tất cả</Option>
          <Option value="Biển">Biển</Option>
          <Option value="Núi">Núi</Option>
          <Option value="Thành phố">Thành phố</Option>
        </Select>
        <span style={{ marginLeft: 16 }}>Sắp xếp:</span>
        <Select value={sapXep} onChange={setSapXep} style={{ width: 150 }}>
          <Option value="Mặc định">Mặc định</Option>
          <Option value="GiaTang">Tổng chi phí tăng dần</Option>
          <Option value="DanhGiaCao">Đánh giá cao nhất</Option>
        </Select>
      </Space>

      <Row gutter={[16, 16]}>
        {dataHienThi.map((item: any) => {
          const tongChiPhi = item.chiPhi.anUong + item.chiPhi.diChuyen + item.chiPhi.luuTru;
          return (
            <Col xs={24} sm={12} md={8} lg={6} key={item.id}>
              <Card 
                hoverable 
                cover={
                  <div style={{ background: '#f0f2f5', height: 180, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                    {item.hinhAnh.startsWith('blob:') || item.hinhAnh.startsWith('http') ? (
                      <img src={item.hinhAnh} alt={item.ten} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    ) : (
                      <span style={{ fontSize: 80 }}>{item.hinhAnh}</span>
                    )}
                  </div>
                }
              >
                <Card.Meta title={item.ten} description={
                  <>
                    <p><b>Loại:</b> {item.loaiHinh} | <b>⭐</b> {item.danhGia}</p>
                    <p><b>Thời gian:</b> {item.thoiGianThamQuan} giờ</p>
                    <p><b>Dự kiến:</b> {tongChiPhi.toLocaleString()} VNĐ</p>
                    <Button type="primary" block onClick={() => moFormThem(item)}>+ Thêm vào lịch</Button>
                  </>
                } />
              </Card>
            </Col>
          );
        })}
      </Row>

      <Modal title={`Thêm "${diemChon?.ten}" vào lịch trình`} visible={modalVisible} onOk={() => form.submit()} onCancel={() => setModalVisible(false)}>
        <Form form={form} layout="vertical" onFinish={handleThem}>
          <Form.Item name="ngay" label="Chọn ngày đi" rules={[{ required: true, message: 'Vui lòng chọn ngày đi!' }]}>
            <DatePicker format="DD/MM/YYYY" style={{ width: '100%' }} placeholder="Chọn ngày trên lịch..." />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};