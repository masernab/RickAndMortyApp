import React from "react";
import {
  BrowserRouter as Router,
  Link,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";

import { Typography, Col, Menu, Row, BackTop } from "antd";
import Layout, { Content, Footer, Header } from "antd/lib/layout/layout";
import Sider from "antd/lib/layout/Sider";

import {
  EnvironmentOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";

import { PersonajesScreen } from "../components/PersonajesScreen";
// import { EpisodiosScreen } from "../components/EpisodiosScreen";
// import { UbicacionesScreen } from "../components/UbicacionesScreen";
import { PersonajeScreen } from "../components/PersonajeScreen";

const { Title } = Typography;

export const AppRouter = () => {
  return (
    <Router>
      <div>
        <Layout>
          <Header
            className="sticky-title"
            style={{ padding: 0, color: "white", zIndex: 1 }}
          >
            <Row justify="space-around">
              <Col>
                <Link to="/">
                  <Title level={1} style={{ margin: "8px", color: "white" }}>
                    Rick y Morty
                  </Title>
                </Link>
              </Col>
            </Row>
          </Header>
          <Layout hasSider>
            <Sider
              collapsedWidth="0"
              breakpoint="md"
              // onBreakpoint={(broken) => {
              //   console.log(broken);
              // }}
              // onCollapse={(collapsed, type) => {
              //   console.log(collapsed, type);
              // }}
            >
              <div className="logo" />
              <Menu
                theme="dark"
                mode="inline"
                defaultSelectedKeys={["1"]}
                className="sticky-menu"
              >
                <Menu.Item key="1" icon={<UserOutlined />}>
                  <Link to="/">Personajes</Link>
                </Menu.Item>
                <Menu.Item key="2" icon={<VideoCameraOutlined />} disabled>
                  <Link to="/episodios">Episodios</Link>
                </Menu.Item>
                <Menu.Item key="3" icon={<EnvironmentOutlined />} disabled>
                  <Link to="/ubicaciones">Ubicaciones</Link>
                </Menu.Item>
              </Menu>
            </Sider>
            <Content style={{ margin: "24px 16px 0" }}>
              <div
                className="site-layout-background"
                style={{ padding: 24, minHeight: 360 }}
              >
                <Switch>
                  <Route exact path="/personajes">
                    <PersonajesScreen />
                  </Route>
                  <Route exact path="/personaje/:personajeId">
                    <PersonajeScreen />
                  </Route>
                  {/* <Route exact path="/episodios" disabled>
                    <EpisodiosScreen />
                  </Route>
                  <Route exact path="/ubicaciones" disabled>
                    <UbicacionesScreen />
                  </Route> */}
                  <Redirect to="/personajes" />
                </Switch>
              </div>
            </Content>
            <BackTop />
          </Layout>

          <Footer style={{ textAlign: "center" }}>
            Rick and Morty ©2021 Created by Miguel Serna
          </Footer>
        </Layout>
      </div>
    </Router>
  );
};
