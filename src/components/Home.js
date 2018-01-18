import React from 'react';
import $ from 'jquery';
import { Tabs, Button, Spin } from 'antd';
import {API_ROOT, GEO_OPTIONS, AUTH_PREFIX, TOKEN_KEY} from '../constants'
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
        const {latitude, longitude} = position.coords;

        localStorage.setItem('POS_KEY',JSON.stringify({lat : latitude, lon : longitude}));
        this.loadNearbyPosts();

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


    loadNearbyPosts = () =>{
        //const {lat, lon} = JSON.parse(localStorage.getItem(POS_KEY));
        const lat = 37.7915953; 
        const lon = -122.3937977;
        $.ajax({
            url: `${API_ROOT}/search?lat=${lat}&lon=${lon}&range=20`,
            method : 'GET',
            headers: {
                Authorization: `${AUTH_PREFIX} ${localStorage.getItem(TOKEN_KEY)}`
            },
        }).then((response)=>{
            console.log(response)

        }, (error)=>{
            console.log(error)

        }).catch((error)=>{
            console.log(error)
        });

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





