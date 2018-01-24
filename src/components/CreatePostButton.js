import React from 'react';
import { Modal, Button } from 'antd';
import {WrappedCreatePostForm} from './CreateButtonForm'

export class CreatePostButton extends React.Component {
    state = {
        ModalText: 'Content of the modal',
        visible: false,
        confirmLoading: false,
    }
    showModal = () => {
        this.setState({
            visible: true,
        });
    }
    handleOk = () => {
        this.setState({
            ModalText: 'The modal will be closed after two seconds',
            confirmLoading: true,
        });
        setTimeout(() => {
            this.setState({
                visible: false,
                confirmLoading: false,
            });
        }, 2000);
    }
    handleCancel = () => {
        console.log('Clicked cancel button');
        this.setState({
            visible: false,
        });
    }

    render() {
        const { visible, confirmLoading, ModalText } = this.state;
        return (
            <div>
                <Button type="primary" onClick={this.showModal}>create post button</Button>
                <Modal title="create new post"
                       visible={visible}
                       onOk={this.handleOk}
                       okText="create"
                       confirmLoading={confirmLoading}
                       onCancel={this.handleCancel}
                       cancelText="cancel"
                >
                    <WrappedCreatePostForm/>
                </Modal>
            </div>
        );
    }
}