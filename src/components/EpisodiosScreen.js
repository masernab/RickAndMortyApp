import { Card, Col, Row } from "antd";
import Meta from "antd/lib/card/Meta";
import Title from "antd/lib/skeleton/Title";
import React, { useEffect, useState } from "react";

export const EpisodiosScreen = () => {
  const [episodios, setEpisodios] = useState([]);
  useEffect(() => {
    const fetchGet = async () => {
      const data = await fetch("https://rickandmortyapi.com/api/episode");
      const { results } = await data.json();
      setEpisodios(results);
    };
    fetchGet();
  }, []);
  return (
    <div>
      <Title level={3} style={{ textAlign: "center" }}>
        Episodios
      </Title>
      <Row gutter={[8, 16]} justify="space-around">
        {episodios.map(({ name, id, episode }) => (
          <Col key={id}>
            <Card hoverable style={{ width: 240 }}>
              <Meta title={`${id} - ${episode}:`} description={`${name}`} />
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};
