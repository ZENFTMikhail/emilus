import React, { Component } from 'react';
import { Form, Avatar, Button, Input, Row, Col, message, Upload } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { ROW_GUTTER } from 'constants/ThemeConstant';
import Flex from 'components/shared-components/Flex';
import { withRouter } from 'react-router-dom';

class EditProfile extends Component {


	constructor(props) {
		super(props);
		
		const user = props.location.state?.user || {};
		console.log(user)

		this.state = {
			avatarUrl: user.img || '',
			name: user.name || '',
			email: user.email || '',
			userName: user.username || '',
			phoneNumber: user.phone || '',
			website: user.website || '',
			address: user.city || '',
			city: user.address || '',
			postcode: user.postcode || '',
		};
	}

	getBase64(img, callback) {
		const reader = new FileReader();
		reader.addEventListener('load', () => callback(reader.result));
		reader.readAsDataURL(img);
	}

	onFinish = async (values) => {
		const key = 'updatable';
		this.setState({ loading: true });

		message.loading({ content: 'Updating changes...', key });


		setTimeout(async () => {
			try {
				const response = await fetch('https://jsonplaceholder.typicode.com/users/1', {
					method: 'PUT',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify(values)
				});

				if (!response.ok) throw new Error('Update failed');

				this.setState({ ...values, loading: false });
				message.success({ content: 'Profile updated successfully!', key, duration: 1 });
				this.props.history.replace('/app/main/clients/user-list');

			} catch (error) {
				this.setState({ loading: false });
				message.error({ content: 'Failed to update profile. Try again.', key, duration: 2 });
			}
		}, 2000);
	};

	onUploadAvatar = (info) => {
		const key = 'updatable';
		if (info.file.status === 'uploading') {
			message.loading({ content: 'Uploading...', key, duration: 1 });
			return;
		}
		if (info.file.status === 'done') {
			this.getBase64(info.file.originFileObj, (imageUrl) =>
				this.setState({ avatarUrl: imageUrl })
			);
			message.success({ content: 'Uploaded!', key, duration: 1.5 });
		}
	};

	onRemoveAvatar = () => {
		this.setState({ avatarUrl: '' });
	};

	render() {
		const { name, email, userName, phoneNumber, website, address, city, postcode, avatarUrl } = this.state;

		return (
			<>
				<Flex alignItems="center" mobileFlex={false} className="text-center text-md-left">
					<Avatar size={90} src={avatarUrl} icon={<UserOutlined />} />
					<div className="ml-md-3 mt-md-0 mt-3">
						<Upload onChange={this.onUploadAvatar} showUploadList={false} action={this.avatarEndpoint}>
							<Button type="primary">Change Avatar</Button>
						</Upload>
						<Button className="ml-2" onClick={this.onRemoveAvatar}>Remove</Button>
					</div>
				</Flex>
				<div className="mt-4">
					<Form
						key={JSON.stringify(this.state)} 
						name="basicInformation"
						layout="vertical"
						initialValues={{
							name,
							email,
							username: userName,
							phoneNumber,
							website,
							address,
							city,
							postcode
						}}
						onFinish={this.onFinish}
					>
						<Row>
							<Col xs={24} sm={24} md={24} lg={16}>
								<Row gutter={ROW_GUTTER}>
									<Col xs={24} sm={24} md={12}>
										<Form.Item label="Name" name="name" rules={[{ required: true, message: 'Please input your name!' }]}>
											<Input />
										</Form.Item>
									</Col>
									<Col xs={24} sm={24} md={12}>
										<Form.Item label="Username" name="username" rules={[{ required: true, message: 'Please input your username!' }]}>
											<Input />
										</Form.Item>
									</Col>
									<Col xs={24} sm={24} md={12}>
										<Form.Item label="Email" name="email" rules={[{ required: true, type: 'email', message: 'Please enter a valid email!' }]}>
											<Input />
										</Form.Item>
									</Col>
									<Col xs={24} sm={24} md={12}>
										<Form.Item label="Phone Number" name="phoneNumber">
											<Input />
										</Form.Item>
									</Col>
									<Col xs={24} sm={24} md={12}>
										<Form.Item label="Website" name="website">
											<Input />
										</Form.Item>
									</Col>
									<Col xs={24} sm={24} md={24}>
										<Form.Item label="Address" name="address">
											<Input />
										</Form.Item>
									</Col>
									<Col xs={24} sm={24} md={12}>
										<Form.Item label="City" name="city">
											<Input />
										</Form.Item>
									</Col>
									<Col xs={24} sm={24} md={12}>
										<Form.Item label="Post code" name="postcode">
											<Input />
										</Form.Item>
									</Col>
								</Row>
								<Button type="primary" htmlType="submit">Save Changes</Button>
							</Col>
						</Row>
					</Form>
				</div>
			</>
		);
	}
}

export default withRouter(EditProfile);
