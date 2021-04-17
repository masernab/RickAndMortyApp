import { Card, Col, Pagination, Row, Skeleton } from "antd";
import Meta from "antd/lib/card/Meta";
import Title from "antd/lib/typography/Title";
import React, { useEffect, useState } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import queryString from "query-string";

export const PersonajesScreen = () => {
  const location = useLocation();
  const history = useHistory();
  let { pagina = 1 } = queryString.parse(location.search);
  pagina = parseInt(pagina);
  const [state, setState] = useState({
    loading: true,
    personajes: [],
    page: pagina,
  });

  const { personajes, total, page, loading } = state;
  useEffect(() => {
    const fetchGet = async () => {
      const data = await fetch(
        `https://rickandmortyapi.com/api/character/?page=${page}`
      );
      const {
        results,
        info: { count },
      } = await data.json();
      setState((s) => ({
        ...s,
        personajes: results,
        total: count,
      }));
      setTimeout(() => {
        setState((s) => ({
          ...s,
          loading: false,
        }));
      }, 100);
    };
    fetchGet();
  }, [page]);

  const handlePagination = (page) => {
    setState({
      ...state,
      loading: true,
      page,
    });
    history.push(`?pagina=${page}`);
  };

  return (
    <div>
      <Title
        level={3}
        style={{
          textAlign: "center",
          margin: "0 auto 0px auto",
          width: "200px",
        }}
      >
        Personajes
      </Title>
      <Row justify="space-around" style={{ padding: "20px" }}>
        <Col>
          <Pagination
            current={page}
            total={total}
            showSizeChanger={false}
            showQuickJumper
            pageSize={20}
            responsive
            onChange={handlePagination}
          />
        </Col>
      </Row>
      <Row gutter={[8, 16]} justify="space-around">
        {personajes.map(({ name, id, image }) => (
          <Col key={id} style={{ width: 240 }}>
            <Skeleton active loading={loading}>
              <Card
                title={name}
                hoverable
                style={{ width: 240 }}
                cover={<img alt={name} src={image} />}
              >
                <Meta
                  description={<Link to={`/personaje/${id}`}>Ver mas...</Link>}
                />
              </Card>
            </Skeleton>
          </Col>
        ))}
      </Row>
      <Row justify="space-around" style={{ paddingTop: "20px" }}>
        <Col>
          <Pagination
            current={page}
            total={total}
            showSizeChanger={false}
            showQuickJumper
            pageSize={20}
            responsive
            onChange={handlePagination}
          />
        </Col>
      </Row>
    </div>
  );
};
