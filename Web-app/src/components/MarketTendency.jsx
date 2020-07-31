import React , { useState, useEffect } from 'react';
import { List , Card , Input , Affix, message , Modal, Button , Select , Form , DatePicker , Cascader , Tooltip } from 'antd';
import './MarketTendency.css'
import MarketSnippet from './MarketSnippet';
const { Search } = Input;



const MarketTendency = (props) =>{
        const [ text , setText ] = useState('')
        const [ data , setData ] = useState([])
        const [ load , setLoad ] = useState(false)
        const [ state , setState ] = useState('Select produce')
        const [ holder , setHolder ] = useState('Select produce')

        const onSearch = (value) => {
            setLoad(true)
            message.info("Under Construction ! Use State Dropdown List")
            console.log(text)
        }
        useEffect(() => {
            let unmounted = false;
            const ac = new AbortController();

            const url = "https://api.data.gov.in/resource/9ef84268-d588-465a-a308-a864a43d0070?api-key=579b464db66ec23bdd0000019c787e3a567e48dc6b48bf98dea2783a&format=json&offset=0&limit=1000&filters[state]="+text; // site that doesn’t send Access-Control-*
            
            fetch(url)
            .then(response => response.text())
            .then(contents => {
                if (!unmounted) {
                    setData(JSON.parse(contents).records)
                    setLoad(false)
                }
            })
            .catch(() => console.log("Can’t access " + url + " response. Blocked by browser?"))

            return () => {
                ac.abort();
                unmounted=true
            }

        })
        const layout = {
            wrapperCol: {
              span: 16,
            },
          };
         

        const onStateChange = (value) => {
            console.log(value)
            setText(value)
            setState(value)
            setHolder(value)
        }
      
    
    
            
        // console.log(data)

        return (
            <div className="market_tendency_container">
                <div className="get_market_report_container">
                    <Card  title="Get Report"  
                    // extra={<Button onClick={onGetReport} > Get Report </Button>} 
                    >
                        <Form
                            {...layout}
                            name="basic"
                            initialValues={{
                                remember: true,
                            }}
                            >
                      
                            <Form.Item
                                label="Crop"
                                name="Crop"
                                rules={[
                                    {
                                    required: true,
                                    message: 'Please enter Crop!',
                                    },
                                ]}
                                >
                                    <Search className="search_container" placeholder="Input Commodity " loading={load} onSearch={value => onSearch(value)} enterButton />
                                </Form.Item>
                                <Form.Item
                                    style={{marginTop:'40px'}}
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
                                        <Tooltip title={holder}>
                                        <Select
                                        placeholder={holder}
                                        onChange={value => onStateChange(value)}
                                        value={state}
                                        allowClear
                                        >
                                        <Select.Option value="Jammu and Kashmir">Jammu and Kashmir</Select.Option>
                                            <Select.Option value="Gujarat">Gujarat</Select.Option>
                                            <Select.Option value="Madhya Pradesh">Madhya pradesh</Select.Option>
                                            <Select.Option value="Andhra Pradesh">Andhra pradesh</Select.Option>
                                            <Select.Option value="Haryana">Haryana</Select.Option>
                                            <Select.Option value="Himachal Pradesh">Himachal Pradesh</Select.Option>
                                            <Select.Option value="Karnataka">Karnataka</Select.Option>
                                            <Select.Option value="NCT of Delhi">NCT of Delhi</Select.Option>
                                            <Select.Option value="Chattisgarh">Chattisgarh</Select.Option>
                                            <Select.Option value="Maharashtra">Maharashtra</Select.Option>
                                            <Select.Option value="Odisha">Odisha</Select.Option>
                                            <Select.Option value="Punjab">Punjab</Select.Option>
                                            <Select.Option value="Rajasthan">Rajasthan</Select.Option>
                                            <Select.Option value="Telangana">Telangana</Select.Option>
                                            <Select.Option value="Tripura">Tripura</Select.Option>
                                            <Select.Option value="Uttar Pradesh">Uttar Pradesh</Select.Option>
                                            <Select.Option value="Uttrakhand">Uttrakhand</Select.Option>
                                            <Select.Option value="West Bengal">West Bengal</Select.Option>
                                            <Select.Option value="Kerala">Kerala</Select.Option>
                                            <Select.Option value="Tamil Nadu">Tamilnadu</Select.Option>
                                        </Select>
                                        </Tooltip>
                                    </div>
                                </Form.Item>
                            </Form>
                        </Card>
                    </div>
                    <List   
                        grid={{
                        gutter: 16,
                        xs: 1,
                        sm: 2,
                        md: 4,
                        lg: 3,
                        xl: 3,
                        xxl: 3,
                        }}
                        dataSource={data}
                        renderItem={item => (
                            <div>
                            <MarketSnippet  item={item}/>
                            </div>    
                        )}
                    />
            </div>
        )

}

export default MarketTendency;