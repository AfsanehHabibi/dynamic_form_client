import React from 'react';
import 'antd/dist/antd.css';
import { Form, Input, Button,InputNumber,DatePicker,Select } from 'antd';
import {SimpleMap} from './map.js';
const { Option } = Select;
const formDescriptor ={
    "title":"A smaple form" , 
    "id" : "1234" , 
    "fields" : [
        {
            "name":"First_Name" , 
            "title" : "First Name" , 
            "type" : "Text",
            "required":true
        } , 
        {
            "name":"Loc" , 
            "title" : "Your Location" , 
            "type" : "Location",
            "required":false
        } , 

        {
            "name":"Request_Type" , 
            "title" : "Request Type" , 
            "type" : "Text" , 
            "options" : [
                {"label" : "Help" , "value" : "Help"}, 
                {"label" : "Info" , "value" : "Information"} 
            ] 
        } , 
        {
            "name":"Base_Location" , 
            "title" : "Base Location" , 
            "type" : "Location" , 
            "options" : [
                {"label" : "Base1" , "value" : {"lat" : "1.2" , "long": "3.2"}}, 
                {"label" : "Base2" , "value" : {"lat" : "2.3" , "long" : "1.434" }} 
            ] 
        } 
    ] 
};
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
export const Demo = () => {
  const onFinish = values => {
    console.debug('Success:', values);
  };

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };
  return (
    <Form
      {...layout}
      name="basic"
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
        {formDescriptor.fields.map((answer, i) => {     
           // Return the element. Also pass key     
           return (<FormItem description= {answer}/>)})}
      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};
class FormItem extends React.Component{
  
  render (){
    let inputBox;
    if(this.props.description.options){
      inputBox = (<Select placeholder="Select option">
        {this.props.description.options.map((answer, i) => {     
           // Return the element. Also pass key     
           return (<Option value={JSON.stringify(answer.value)}>{answer.label}</Option>)})}
      </Select>);
    }else if(this.props.description.type === "Text"){
      inputBox=<Input />;
    }else if(this.props.description.type === "Location"){
      inputBox=<SimpleMap/>;
    }else if(this.props.description.type === "Number"){
      inputBox=<InputNumber min={1} max={10} />;
    }else if(this.props.description.type === "Date"){
      inputBox=<DatePicker />;
    }
   
    return(<Form.Item
      label={this.props.description.title}
      name={this.props.description.name}
      rules={[
        {
          required: this.props.description.required,
          message: 'Please input your username!',
        },
      ]}
    >
      
      {inputBox}
      
      
    </Form.Item>
    );
  }
}
