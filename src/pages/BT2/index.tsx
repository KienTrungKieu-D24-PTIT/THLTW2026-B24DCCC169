import { useModel } from 'umi';
import { Card, List, Typography, Tag } from 'antd';

const { Title } = Typography;

const QuanLyHocTapNuaChung = () => {
  // Lấy danh mục môn học từ model 'hoctap'
  const { danhMucMonHoc } = useModel('hoctap');

  return (
    <Card title="Bài 2: Quản lý học tập (Đang hoàn thiện)">
      <Title level={5}>Danh mục môn học hiện có:</Title>
      <List
        bordered
        dataSource={danhMucMonHoc}
        renderItem={(item) => (
          <List.Item>
            <Tag color="green">{item}</Tag>
          </List.Item>
        )}
      />
      <div style={{ marginTop: 20 }}>
        <p><i>Ghi chú: Phần thêm/xóa và lưu LocalStorage đang được cập nhật...</i></p>
      </div>
    </Card>
  );
};

export default QuanLyHocTapNuaChung;
