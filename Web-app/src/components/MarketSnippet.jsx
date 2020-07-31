import React from 'react';
import { List , Card , Modal } from 'antd';


class MarketSnippet extends React.Component {
    state = { visible: false };

    showModal = () => {
      this.setState({
        visible: true,
      });
    };
  
    handleOk = e => {
      this.setState({
        visible: false,
      });
    };
  
    handleCancel = e => {
      this.setState({
        visible: false,
      });
    };
    render(){
        return(
            <div >
              <div>
                <List.Item  onClick={this.showModal}>   
                    <Card className="card_container" title={this.props.item.name}
                          // cover={<img alt="example" src={this.props.item.url} height={300}/>}
                          >
                          <h3>Commodity: {this.props.item.commodity}<br /></h3> 
                            State:  {this.props.item.state}<br />
                    </Card>
                  </List.Item>
                  <Modal
                      title={`Market Price: ${this.props.item.state}(${this.props.item.district})`}
                      visible={this.state.visible}
                      onOk={this.handleOk}
                      onCancel={this.handleCancel}
                      >
                    <h3>{`${this.props.item.commodity}    ( Arrival Date: ${this.props.item.arrival_date})`}<br />Modal Price: Rs.{this.props.item.modal_price} / Quintal</h3><br />
                    MaxPrice: Rs. {this.props.item.max_price} / Quintal<br />
                    MinPrice: Rs. {this.props.item.min_price} / Quintal
                  </Modal>
                </div>
              

              {/* } */}
                
            </div>
        )
    }
}
export default MarketSnippet;