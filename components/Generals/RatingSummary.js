import { Rate, Typography, Progress, Button, Row, Col, Divider } from "antd";

const { Title, Text, Link } = Typography;

export default function RatingSummary({
  rating = 4.5,
  ratingCount = 5200,
  ratingStats = {},
}) {
  const total = ratingCount || 1;

  return (
    <div
      style={{
        background: "#fff",
        borderRadius: 12,
      }}
    >
      <div style={{ marginBottom: 16 }}>
        <Title level={5} style={{ marginBottom: 0 }}>
          Үнэлгээ
        </Title>
        <Text type="secondary">Үйлчлүүлэгчдээс өгсөн үнэлгээ.</Text>
      </div>

      <Row align="middle" style={{ marginBottom: 24 }}>
        <Col span={8} style={{ textAlign: "center" }}>
          <Title level={1} style={{ margin: 0 }}>
            {rating.toFixed(1)}
          </Title>
          <Rate allowHalf disabled value={rating} />
          <div style={{ marginTop: 4 }}>
            <Text type="secondary">
              {rating.toFixed(1)} • {ratingCount.toLocaleString()} Үнэлгээ
            </Text>
          </div>
        </Col>
        <Col span={16}>
          {[5, 4, 3, 2, 1].map((star) => {
            const count = ratingStats[star] || 0;
            const percent = Math.round((count / total) * 100);
            return (
              <Row key={star} align="middle" style={{ marginBottom: 8 }}>
                <Col span={3}>
                  <Text>{star} ★</Text>
                </Col>
                <Col span={18}>
                  <Progress
                    percent={percent}
                    showInfo={false}
                    strokeColor="#fadb14"
                    trailColor="#f0f0f0"
                  />
                </Col>
                <Col span={3} style={{ textAlign: "right" }}>
                  <Text type="secondary">{count}</Text>
                </Col>
              </Row>
            );
          })}
        </Col>
      </Row>

      <Divider />
    </div>
  );
}
