import React from 'react';
import 'antd/dist/antd.css';
import { Form, Input, Button, InputNumber, DatePicker, Select } from 'antd';
import { SimpleMap } from './map.js';
const axios = require('axios').default;
const { Option } = Select;
const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};
export class FormClass extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formDescriptor: {
        "title": "mohammad",
        "id": "2",
        "fields": [
          {
            "name": "Favorite_Name",
            "title": "Favorite_Name",
            "type": "Text",
            "required": false
          }
        ]
      }
    };
  }
  componentDidMount() {
    console.debug("wahts happentin");
    const { handle } = this.props.match.params
    axios.get(`http://localhost:${process.env.REACT_APP_BACKEND_PORT}/api/forms/${handle}`)
      .then(res => {
        console.debug("res.data");
        this.setState({
          formDescriptor: res.data
        });
      })
  }
  onFinish = values => {
    console.debug('Success:', values);
    axios.post(`http://localhost:${process.env.REACT_APP_BACKEND_PORT}/api/forms/${this.state.formDescriptor.id}`, { values })
      .then(res => {
        console.debug("res");
        console.debug(res);
      })
  };

  onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };
  render() {
    return (
      <Form
        {...layout}
        name="basic"
        initialValues={{
          remember: true,
        }}
        onFinish={this.onFinish}
        onFinishFailed={this.onFinishFailed}
      >
        {this.state.formDescriptor.fields.map((answer, i) => {
          // Return the element. Also pass key     
          return (<FormItem description={answer} />)
        })}
        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            Submit
        </Button>
        </Form.Item>
      </Form>
    );
  }
}
class FormItem extends React.Component {

  render() {
    let inputBox;
    if (this.props.description.options) {
      inputBox = (<Form.Item
        label={this.props.description.title}
        name={this.props.description.name}
        rules={[
          {
            required: this.props.description.required,
            message: 'Please input your username!',
          },
        ]}
      ><Select placeholder="Select option">
          {this.props.description.options.map((answer, i) => {
            // Return the element. Also pass key     
            return (<Option value={JSON.stringify(answer.value)}>{answer.label}</Option>)
          })}
        </Select></Form.Item>);
    } else if (this.props.description.type === "Text") {
      inputBox = (<Form.Item
        label={this.props.description.title}
        name={this.props.description.name}
        rules={[
          {
            required: this.props.description.required,
            message: 'Please input your username!',
          },
        ]}
      ><Input /></Form.Item>);
    } else if (this.props.description.type === "Location") {
      inputBox = <Form.Item name="value"
        label={this.props.description.title}
        rules={[
          {
            required: this.props.description.required,
            message: 'Please input your username!',
          },
        ]}
      >
        <SimpleMap />
      </Form.Item>
    } else if (this.props.description.type === "Number") {
      inputBox = (<Form.Item
        label={this.props.description.title}
        name={this.props.description.name}
        rules={[
          {
            required: this.props.description.required,
            message: 'Please input your username!',
          },
        ]}
      ><InputNumber min={1} max={10} /></Form.Item>);
    } else if (this.props.description.type === "Date") {
      inputBox = (<Form.Item
        label={this.props.description.title}
        name={this.props.description.name}
        rules={[
          {
            required: this.props.description.required,
            message: 'Please input your username!',
          },
        ]}
      ><DatePicker /></Form.Item>);
    }

    return (
      <div>{inputBox}</div>

    );
  }
}

