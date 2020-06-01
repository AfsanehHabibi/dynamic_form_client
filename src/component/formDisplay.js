import React from 'react';
import 'antd/dist/antd.css';
import { Form, Input, Button, InputNumber, DatePicker, Select } from 'antd';
import {NotFound} from './notFound';
import { Space,Spin, Alert } from 'antd';
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
      loading : true,
      formDescriptor: {},
      loadNotFound : false
    };
  }
  componentDidMount() {
    console.debug("wahts happentin");
    const { handle } = this.props.match.params
    axios.get(`http://localhost:${process.env.REACT_APP_BACKEND_PORT}/api/forms/${handle}`)
      .then(res => {
        console.debug("res.data");
        this.setState({
          loading :false,
          formDescriptor: res.data
        });
      })
      .catch((e) => 
      {
        this.setState({
          loading :false,
          loadNotFound :true
        });
        console.error(e);
      });
  }
  onFinish = values => {
    console.debug(values)
    this.state.formDescriptor.fields.forEach(element => {
      if(element.options){
        values[element.name] =JSON.parse(values[element.name]);
      }else if(element.type === "Location"){
        values[element.name].value = JSON.parse(values[element.name].value);
      }
    }); 
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
    let output;
    if(this.state.loading){
      output=(<div><Spin tip="Loading..." size="large"/></div>);
      console.debug("first")
    }else if(this.state.loadNotFound){
      output= (<NotFound/>);
    }
    else{
      output=(<div><Form
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
    </Form></div>);
          console.debug("first")
    }
    return (
      <div>
      {output}
    </div>
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
      inputBox = <Form.Item name={this.props.description.name}
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
      ><InputNumber formatter={value => `${value}`.replace(/[^.\d]/g,'') }
      parser={value => value}/></Form.Item>);
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

