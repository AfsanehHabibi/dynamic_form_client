import React from 'react';
import './App.css';
import { FormClass } from './component/formDisplay.js';
import { LoadMoreList } from './component/formsList.js';
import { NotFound } from './component/notFound.js';
import { Layout, Menu } from 'antd';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
const { Header, Content, Footer } = Layout;
function App() {
  return (
    <Router><Layout className="layout">
      <Header>
        <div className="logo" />
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
          <Menu.Item key="1"><Link to={`/`}>Home</Link></Menu.Item>
        </Menu>
      </Header>
      <Content style={{ padding: '10vh 25vw 10vh 25vw' }}>
        <div className="site-layout-content" ><Switch>
          <Route exact path="/" >
            <LoadMoreList />
          </Route>
          <Route path='/form/:handle' component={FormClass}>
          </Route>
          <Route path='*' exact={true} component={NotFound} />
        </Switch></div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>create dynamic forms</Footer>
    </Layout>
    </Router>
  );
}

export default App;
