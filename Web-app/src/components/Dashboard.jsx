import React , { useState } from 'react';
import { Tabs , Button , Affix , message , Space } from 'antd';
import { AppleOutlined, ControlOutlined , DollarCircleOutlined, WechatOutlined, AppstoreAddOutlined } from '@ant-design/icons';
import { navigate } from '@reach/router';
import Forum from './Forum';
import ForecastAnalysis from './ForecastAnalysis';
import HistoricalReport from './HistorcalReport';
import MarketTendency from './MarketTendency';
import CreateQuery from './CreateQuery';
import { auth } from '../../firebase'
import './Dashboard.css'

const { TabPane } = Tabs;

 
const Dashboard = (props) => {

    const [ load , setLoad ] =useState(false)


    const onSignOut = () => {
        setLoad(true)
        auth.signOut()
            .then(function(result) {
                message.success("logout successful");
                navigate('/')
            })
            .catch(function(error) {
                console.log(error);
                setLoad(false)
            })
    }
    const operations = <Button type="primary" onClick={onSignOut} loading ={load}>Sign Out</Button>;

    return (
        <div className="dashboard_container">
            <div className="tabs_container"style={{margin:'30px'}}>
                    <Tabs defaultActiveKey="1" tabBarExtraContent={operations} >
                        <TabPane
                        tab={
                            <span>
                            <AppleOutlined />
                            Prediction Report
                            </span>
                        }
                        key="1"
                        >
                        <HistoricalReport/>
                        </TabPane>
                        <TabPane
                        tab={
                            <span>
                            <ControlOutlined />
                            Forecast Analysis
                            </span>
                        }
                        key="2"
                        >
                        <ForecastAnalysis/>
                        </TabPane>
                        <TabPane
                        tab={
                            <span>
                            <DollarCircleOutlined />
                            Market Tendency
                            </span>
                        }
                        key="3"
                        >
                        <MarketTendency />
                        </TabPane>
                        <TabPane
                        tab={
                            <span>
                            <WechatOutlined />
                            Forum
                            </span>
                        }
                        key="4"
                        >
                        <Forum />
                        </TabPane>
                        <TabPane
                        tab={
                            <span>
                            <AppstoreAddOutlined />
                            Create Query
                            </span>
                        }
                        key="5"
                        >
                        <CreateQuery />
                        </TabPane>
                    </Tabs>
                    
               
            </div>
            
        </div>
    )
}

export default Dashboard;