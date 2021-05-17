import React, { Children, Component, useState } from 'react'
import ReactDOM from 'react-dom'
import { Link, useLocation, useParams } from 'react-router-dom'
import queryString from 'query-string'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { Button, List, Table, Drawer, Form, Col, Row, Input, Select, DatePicker, Space, InputNumber, TimePicker } from 'antd'
import { DeleteTwoTone, SettingFilled } from '@ant-design/icons'
import axios from 'axios'
import Header from './Header'
import AddTask from './AddTask'
import 'antd/dist/antd.css';


class App extends Component {

  constructor(props) {
    super(props);
    modalIsOpen: false,

      this.state = {
        data: [],
        typo: [],
        items: [],
        item: '',
        url: [],
      }
  }
  showDrawer = () => {
    this.setState({
      visible: true,
    });

  };
  //Load tat ca task
  componentDidMount() {
    axios.get('../showtask').then(response => {
      this.setState({
        data: response.data
      })
    }),
      axios.get('../gettypo').then(response => {
        this.setState({
          typo: response.data
        })
      })
  }

  onClose = () => {
    this.setState({
      visible: false,
    });
    this.setState({
      item: '',
    })
    this.componentDidMount()
  };




  //Xoa task
  deleteTask = (id) => {
    axios.post(`../deletetask/${id}`)
      .then(response => {
        alert('Xoa thanh cong');
        this.setState({
          data: response.data
        });
      })
      .catch(error => {
        console.log(error);
      })
  };
  state = { visible: false };

  render() {
    const { data } = this.state;
    const { typo } = this.state;
    const { visible } = this.state;
    const { items } = this.state;

    const columns = [
      {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
      },
      {
        title: 'Item name',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
      },
      {
        title: 'Start day',
        dataIndex: 'startday',
        key: 'startday',
      },
      {
        title: 'End day',
        dataIndex: 'endday',
        key: 'endday',
      },
      {
        title: 'Quantity',
        dataIndex: 'quantity',
        key: 'quantity',
      },
      {
        title: 'Timeout (Win)',
        dataIndex: 'timeoutwin',
        key: 'timeoutwin',
      },
      {
        title: 'Time out (Not win)',
        dataIndex: 'timeoutNwin',
        key: 'timeoutNwin',
      },
      {
        title: 'Win postiton',
        dataIndex: 'winpostion',
        key: 'winpostion',
      },
      {
        title: 'Not win postiton',
        dataIndex: 'Nwinpostion',
        key: 'Nwinpostion',
      },
      {
        title: 'Session reset',
        dataIndex: 'sessionreset',
        key: 'sessionreset',
      },
      {
        title: 'Typography',
        dataIndex: 'typo_id',
        key: 'typo_id',
      },
      {
        title: 'Action',
        key: 'action',
        render: (text, record) => (
          <Space size="middle">
            <Button onClick={() => this.deleteTask(record.id)} ><DeleteTwoTone /></Button>
            <Button onClick={() => this.showDrawer()} >
              <Link to={{ pathname: `q=URLUtils.searchParams&itemid=${record.id}` }}>
                <SettingFilled />
              </Link>
            </Button>
          </Space>
        ),
      },
    ];


    return (
      <BrowserRouter>
        <>
          <Header onAdd={() => this.showDrawer()} />
          <Switch>
            <Table dataSource={data} key={data.id} columns={columns} />;
                    </Switch>
          <AddTask visible={visible} item={items} typo={typo} onClose={() => this.onClose()} />
        </>
      </BrowserRouter>

    );
  }
}
ReactDOM.render(<App />, document.getElementById('container'))
