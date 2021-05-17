import { useState, useEffect } from 'react'
import { Link, Redirect } from 'react-router-dom'
import moment from "moment"
import queryString from 'query-string'
import { Button, List, Table, Drawer, Form, Col, Row, Input, Select, DatePicker, Space, InputNumber, TimePicker } from 'antd'



export const AddTask = ({ typo, onClose, visible }) => {

  const { RangePicker } = DatePicker;
  const { Option } = Select;

  let datetime = "YYYY-MM-DD HH:mm:ss";
  let time = "HH:mm:ss";

  const [form] = Form.useForm();
  const [formLayout, setFormLayout] = useState('horizontal');
  const [iditem, setIdItem] = useState('')
  var paramsString = window.location.pathname;
  var searchParams = new URLSearchParams(paramsString);

  const onFormLayoutChange = ({ layout }) => {
    setFormLayout(layout);
  };

  function getItemId() {
    console.log('Id:', searchParams.get('itemid'))
  }

  useEffect(() => {
    onEdit()
  });

  function onEdit() {
    getItemId(),
      (searchParams.get('itemid')) ? axios.get(`../gettask/${searchParams.get('itemid')}`)
        .then(response => {
          //setTakeid(response.data.id),
          console.log('data', response.data[0].timeoutwin)
          form.setFieldsValue({
            name: response.data[0].name,
            status: response.data[0].status,
            startday: moment(response.data[0].startday, datetime),
            endday: moment(response.data[0].endday),
            quantity: response.data[0].quantity,
            timeoutwin: moment(response.data[0].timeoutwin, "HH:mm:ss"),
            timeoutNwin: moment(response.data[0].timeoutNwin, "HH:mm:ss"),
            winpostion: response.data[0].winpostion.split(","),
            Nwinpostion: response.data[0].Nwinpostion.split(","),
            sessionreset: response.data[0].sessionreset,
            typo_id: response.data[0].typo_id
          });
        }) : console.log('test itemid')
  };


  //Luu task
  function onFinish(values) {
    const name = values.name;
    const status = values.status;
    const quantity = values.quantity;
    const startday = moment(values.startday).format(datetime);
    const endday = moment(values.endday).format(datetime);
    const timeoutwin = moment(values.timeoutwin).format(time);
    const timeoutNwin = moment(values.timeoutNwin).format(time);
    const winpostion = values.winpostion.toString();
    const Nwinpostion = values.Nwinpostion.toString();
    const sessionreset = values.sessionreset;
    const typo_id = values.typo_id;
    console.log({ values });

    (!searchParams.get('itemid')) ?
      axios.post('../sendrequest',
        { name, status, quantity, startday, endday, timeoutwin, timeoutNwin, winpostion, Nwinpostion, sessionreset, typo_id }
      ).then((res) => {
        alert('Them thanh cong');
      })
        .catch(error => {
          //
        }) :
      axios.post(`../updatetask/${searchParams.get('itemid')}`, {
        name, status, quantity, startday, endday, timeoutwin, timeoutNwin, winpostion, Nwinpostion, sessionreset, typo_id
      }).then((res) => {
        alert('Cap nhat thanh cong');
      })
        .catch(error => {
          //
        })
  };

  return (
    <>
      <Drawer
        title="Create a new Item"
        width={1000}
        //onClose={onClose}
        visible={visible}
        bodyStyle={{ paddingBottom: 80 }}
        footer={
          <div
            style={{
              textAlign: 'right',
            }}
          >
            <Button onClick={onClose} style={{ marginRight: 8 }}>
              <Link to={{ pathname: '/' }}>
                Cancel
                            </Link>
            </Button>
          </div>
        }
      >
        <Form layout="vertical" hideRequiredMark form={form} onFinish={onFinish}>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="name"
                label="Line item name"
                rules={[{ required: true, message: 'Please enter item name' }]}
              >
                <Input placeholder="Line item name" required />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="status"
                label="Status"
                rules={[{ required: true, message: 'Status' }]}
              >
                <Select>
                  <Select.Option value="86">+86</Select.Option>
                  <Select.Option value="87">+87</Select.Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Start day">
                <Form.Item
                  name="startday">
                  <DatePicker showTime format={datetime} style={{ width: '100%' }}
                  />
                </Form.Item>
              </Form.Item>

            </Col>
            <Col span={12}>
              <Form.Item label="End day">
                <Form.Item
                  name="endday">
                  <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" style={{ width: '100%' }} />
                </Form.Item>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="quantity"
                label="Quantity"
              >
                <InputNumber placeholder="Quantity" style={{ width: '100%' }} required />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Timeout (Win)">
                <Form.Item
                  name="timeoutwin"
                  rules={[{ required: true, message: 'Please enter timeout (win)' }]}
                >
                  <TimePicker format="HH:mm:ss" />
                </Form.Item>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Timeout (Not win)">
                <Form.Item
                  name="timeoutNwin"
                  rules={[{ required: true, message: 'Please enter timeout (Not win)' }]}
                >
                  <TimePicker format="HH:mm:ss" />
                </Form.Item>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Win postison">
                <Form.Item
                  name="winpostion"

                  rules={[{ required: true, message: 'Please enter win postition' }]}
                >
                  <Select mode="tags" style={{ width: '100%' }} placeholder="win postition">
                  </Select>
                </Form.Item>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Not win postison">
                <Form.Item
                  name="Nwinpostion"
                  rules={[{ required: true, message: 'Please not win postition' }]}
                >
                  <Select mode="tags" style={{ width: '100%' }} placeholder="Not win postition">
                  </Select>
                </Form.Item>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="sessionreset"
                label="Session reset"
                rules={[{ required: true, message: 'Please enter session reset' }]}
              >
                <Input placeholder="Session reset" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="typo_id"
                label="Typography"
                rules={[
                  {
                    required: true,
                    message: 'Typography',
                  },
                ]}
              >
                <Select>
                  {typo.map((typos, index) => (
                    <Option key={index} value={typos.id}>
                      {typos.typography}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Form.Item >
            <Button type="primary" htmlType='submit'>Submit</Button>
          </Form.Item>
        </Form>
      </Drawer>
    </>

  )
}

export default AddTask
