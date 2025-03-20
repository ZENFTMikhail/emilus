import React, { Component } from 'react';
import { Avatar, Drawer, Divider } from 'antd';
import { 
	UserOutlined, 
	MobileOutlined, 
	MailOutlined, 
	CompassOutlined, 
	GlobalOutlined
} from '@ant-design/icons';

export class UserView extends Component {
	render() {
		const { data, visible, close } = this.props;


		if (!visible || !data) return null;

		return (
			<Drawer
				width={300}
				placement="right"
				onClose={close}
				visible={visible}
				destroyOnClose={true} 
			>
				<div className="text-center mt-3">
					<Avatar size={80} src={data?.img} />
					<h3 className="mt-2 mb-0">{data?.name}</h3>
				</div>
				<Divider dashed />
				<div>
					<h6 className="text-muted text-uppercase mb-3">Account details</h6>
					<p>
						<UserOutlined />
						<span className="ml-3 text-dark">{data?.name}</span>
					</p>
				</div>
				<div className="mt-5">
					<h6 className="text-muted text-uppercase mb-3">CONTACT</h6>
					<p>
						<MobileOutlined />
						<span className="ml-3 text-dark">{data?.phone}</span>
					</p>
					<p>
						<MailOutlined />
						<span className="ml-3 text-dark">{data?.email || '-'}</span>
					</p>
					<p>
						<CompassOutlined />
						<span className="ml-3 text-dark">{data?.address}</span>
					</p>
				</div>
				<div className="mt-5">
					<h6 className="text-muted text-uppercase mb-3">Social profiles</h6>
					<p>
						<GlobalOutlined />
						<a href="/#" className="ml-3 text-dark">{data?.website || '-'}</a>
					</p>
				</div>
			</Drawer>
		);
	}
}

export default UserView;
