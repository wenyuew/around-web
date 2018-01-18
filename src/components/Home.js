import React from 'react';
import { Tabs, Button, Spin } from 'antd';
import {GEO_OPTIONS} from '../constants'
const TabPane = Tabs.TabPane;

const operations = <Button>Extra Action</Button>;


export class Home extends React.Component {
    state = {
        loadingGeoLocation : false,
        error : '',

    }
    componentDidMount () {
        this.setState({loadingGeoLocation: true, error: ''});
        this.getGeoLocation();

    }

    getGeoLocation =() => {
        if ("geolocation" in navigator) {
            /* geolocation is available */
            navigator.geolocation.getCurrentPosition(
                this.onSuccessLoadEgoLocation,
                this.onFailLoadEgoLocation,
                GEO_OPTIONS,

            );
        } else {
            /* geolocation IS NOT available */
            this.setState({error: 'your browser does not  support geolocation  '})
        }

    }
    onSuccessLoadEgoLocation =(position) =>{
        console.log(position);
        this.setState({loadingGeoLocation:false, error:''});

    }

    onFailLoadEgoLocation =() =>{
        this.setState({loadingGeoLocation:false, error: 'failed to load geolocation'});

    }

    getGalleryPanelContent=() =>{
        if (this.state.error) {
            return <div>{this.state.error}</div>;
        } else if (this.state.loadingGeoLocation){
            return <Spin tip="Loading geolocation..."/>;
        }else {
            return null;
        }
    }


    render() {
        return (

                <Tabs tabBarExtraContent={operations}>
                    <TabPane tab="Posts" key="1">
                        {this.getGalleryPanelContent()}

                    </TabPane>
                    <TabPane tab="Map" key="2">Content of tab 2</TabPane>
                </Tabs>

        );
    }
}





