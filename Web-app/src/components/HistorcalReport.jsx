import React from 'react';
import { Input, Select , Button , Form, DatePicker, Card , Cascader , Tooltip , Affix , message } from 'antd';
import './HistoricalReport.css'
import Map from './map';

const HistoricalReport = (props) => {
  const layout = {
    wrapperCol: {
      span: 16,
    },
  };
    const options = [
        {
          value: 'Fruits',
          label: 'Fruits',
          children: [
            {
              value: 'Apple',
              label: 'Apple',
            },
            {
                value: 'Watermelon',
                label: 'Watermelon',
              },
          ],
        },
        {
          value: 'Vegetables',
          label: 'Vegetables',
          children: [
            {
              value: 'Tomato',
              label: 'Tomato',
              
            },
            {
                value: 'Onions',
                label: 'Onions',
                
              },
          ],
        },
      ];
      const onGetReport = (event) => {
        message.warning("under construction")
      }

    return (
        <div className="historical_report_container">
          
        <div className="map_container">
          <Map />
        </div>
      <Affix offsetTop={40}>
           <div className="get_historical_container">
                <Card className="inputs_container" title="Get Report"  extra={<Button onClick={onGetReport} > Get Report </Button>} >
                <div >
                  <Form
                      {...layout}
                      name="basic"
                      initialValues={{
                        remember: true,
                      }}
                    >
                      <Form.Item
                          label="Crop"
                          name="crop"
                          rules={[
                            {
                              required: true,
                              message: 'Please select the crop!',
                            },
                          ]}
                        >
                          <div className="site-input-group-wrapper">
                            < Input.Group compact>
                                    <Cascader style={{ width: '100%' }}  options={options} placeholder="Select Crop" />
                                </Input.Group>
                          </div>
                        </Form.Item>
                        <Form.Item
                          label="Date"
                          name="date"
                          rules={[
                            {
                              required: true,
                              message: 'Please enter the date!',
                            },
                          ]}
                        >
                          <DatePicker style={{ width: '100%' }} />
                        </Form.Item>
                        <Form.Item
                          label="State"
                          name="state"
                          rules={[
                            {
                              required: true,
                              message: 'Please enter the state!',
                            },
                          ]}
                        >
                          <div >
                            <Tooltip title="Select a state ">
                            <Select
                              placeholder="Select a state"
                              allowClear
                            >
                              <Select.Option value="jk">Jammu and Kashmir</Select.Option>
                                <Select.Option value="jharkhand">Jharkhand</Select.Option>
                                <Select.Option value="Madhyapradesh">Madhya pradesh</Select.Option>
                                <Select.Option value="Andhrapradesh">Andhra pradesh</Select.Option>
                                <Select.Option value="arunachalpradesh">Arunachal pradesh</Select.Option>
                                <Select.Option value="manipur">Manipur</Select.Option>
                                <Select.Option value="sikkhim">Sikkhim</Select.Option>
                                <Select.Option value="nagaland">Nagaland</Select.Option>
                                <Select.Option value="chattisgarh">Chattisgarh</Select.Option>
                                <Select.Option value="assam">Assam</Select.Option>
                                <Select.Option value="haryana">Haryana</Select.Option>
                                <Select.Option value="odisha">Odisha</Select.Option>
                                <Select.Option value="kerals">Kerala</Select.Option>
                                <Select.Option value="tamilnadu">Tamilnadu</Select.Option>
                              </Select>
                              </Tooltip>
                          </div>
                    </Form.Item>
                </Form>
              </div>
            </Card>
        </div>
        </Affix>
        </div>
    )
}
export default HistoricalReport;