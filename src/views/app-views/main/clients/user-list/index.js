import React, { useState, useEffect } from 'react';
import { Card, Table, Tag, Tooltip, message, Button } from 'antd';
import { EyeOutlined, DeleteOutlined } from '@ant-design/icons';
import {  Link } from 'react-router-dom';
import moment from 'moment';
import UserView from './UserView';
import AvatarStatus from 'components/shared-components/AvatarStatus';


const UserList = ({match}) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userProfileVisible, setUserProfileVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);




  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(data => {
        const formattedUsers = data.map(user => ({
          id: user.id,
          name: user.name,
          email: user.email,
          username: user.username,
          address: user.address.city,
          city: user.address.street,
          postcode: user.address.zipcode,
          phone: user.phone,
          role: 'User',
          website: user.website,
          company: user.company.name,
          lastOnline: moment().unix(),
          status: 'active',
          
        }));
        setUsers(formattedUsers);
      })
      .catch(error => {
        console.error("Ошибка загрузки пользователей:", error);
        message.error("Не удалось загрузить пользователей");
      })
      .finally(() => setLoading(false));
  }, []);


  const deleteUser = userId => {
    setUsers(users.filter(user => user.id !== userId));
    message.success({content: `Deleted user ${userId}`, duration: 2});
  };


  const showUserProfile = userInfo => {
    setSelectedUser(userInfo);
    setUserProfileVisible(true);
  };


  const closeUserProfile = () => {
    setUserProfileVisible(false);
    setSelectedUser(null);
  };




  const tableColumns = [
    {
      title: 'User',
      dataIndex: 'name',
      render: (_, record) => (
        <Link
        to={{
          pathname: `${match.url.replace('/user-list', '')}/setting/edit-profile`,
          state: { user: record }, 
        }}>
          <div className="d-flex cursor-pointer">
            <AvatarStatus src={record.img} name={record.name} subTitle={record.email} />
          </div>
        </Link>
      ),
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: 'Role',
      dataIndex: 'role',
    },
    {
      title: 'Last online',
      dataIndex: 'lastOnline',
      render: date => <span>{moment.unix(date).format("MM/DD/YYYY")} </span>,
      sorter: (a, b) => a.lastOnline - b.lastOnline,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      render: status => (
        <Tag className="text-capitalize" color={status === 'active' ? 'cyan' : 'red'}>
          {status}
        </Tag>
      ),
    },
    {
      title: '',
      dataIndex: 'actions',
      render: (_, record) => (
        <div className="text-right">
          <Tooltip title="View">
            <Button type="primary" className="mr-2" icon={<EyeOutlined />} onClick={() => showUserProfile(record)} size="small" />
          </Tooltip>
          <Tooltip title="Delete">
            <Button danger icon={<DeleteOutlined />} onClick={() => deleteUser(record.id)} size="small" />
          </Tooltip>
        </div>
      ),
    }
  ];

  return (
    <Card bodyStyle={{ padding: '0px' }}>
      <Table
        columns={tableColumns}
        dataSource={users}
        rowKey="id"
        loading={loading}
      />
      <UserView data={selectedUser} visible={userProfileVisible} close={closeUserProfile} />
    </Card>
  );
};

export default UserList;
