import { Card, Tabs, Row, Col, Button, Form, InputNumber, Switch, message, Upload} from 'antd';
import Flex from 'components/shared-components/Flex';
import { useState } from 'react';
import { DeleteOutlined, UploadOutlined, SaveOutlined } from '@ant-design/icons';






const ArrayObject = [
    {
        title: "Новые столы",
        arrayObj: [
            { id: 1, title: 'Стол на 2 места',img: 'https://i.postimg.cc/85kpn5N2/table2.png', x: 0, y: 0, rotation: 0, width: 80, height: 80 },
            { id: 2, title: 'Стола на 5 мест', img: 'https://i.postimg.cc/fb9qnjTX/table5.png', x: 0, y: 0, rotation: 0, width: 80, height: 80 },
            { id: 3, title: 'Стол на 6 мест', img: 'https://i.postimg.cc/X7BVPt6Y/table6.png', x: 0, y: 0, rotation: 0, width: 80, height: 80 },
            { id: 4, title: 'Стул', img: 'https://i.postimg.cc/wMGjNpKS/chair.png', x: 0, y: 0, rotation: 0, width: 80, height: 80},

        ],
    }, 
    {
        title: "Новые элементы",
        arrayObj: [
            { id: 1, title: 'Зона 3 места', img: 'https://i.postimg.cc/8zrmjkQg/zona-for-3.png', x: 0, y: 0, rotation: 0, width: 80, height: 80 },
            { id: 2, title: 'Зона 4 места', img: 'https://i.postimg.cc/LsKBfd2Y/zona-for-4.png', x: 0, y: 0, rotation: 0, width: 80, height: 80 }
        ],
    },
    {
        title: "Custom",
        arrayObj: [
            { id: 1, title: 'Стул', img: 'https://i.postimg.cc/wMGjNpKS/chair.png', x: 0, y: 0, rotation: 0, width: 80, height: 80},

        ],
    },
    {
        title: "Места",
        arrayObj: [
            {}
        ]
    },
    {
        title: "Прочее",
        arrayObj: [
            {}
        ]
    }
];

const Scheduler = () => {
    const [activeTab, setActiveTab] = useState(0);
    const [droppedItems, setDroppedItems] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null); 
    const [web, setWeb] = useState(false)

    const handleDragStart = (e, item, isDroppedItem = false) => {

        const rect = e.target.getBoundingClientRect();
        const offsetX = e.clientX - rect.left;
        const offsetY = e.clientY - rect.top;


        e.dataTransfer.setData('text/plain', JSON.stringify({
            ...item,
            offsetX,
            offsetY,
            isDroppedItem,
        }));
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleDrop = (e) => {
        e.preventDefault();
        const data = JSON.parse(e.dataTransfer.getData('text/plain'));
        const { offsetX, offsetY, isDroppedItem, ...item } = data;
        const rect = e.currentTarget.getBoundingClientRect();
    
        let x = e.clientX - rect.left - offsetX;
        let y = e.clientY - rect.top - offsetY;
    
        if (y < 50) { y = 50; }
    
        if (isDroppedItem) {
            setDroppedItems((prevItems) =>
                prevItems.map((prevItem) =>
                    prevItem.id === item.id ? { ...prevItem, x, y } : prevItem
                )
            );
        } else {
            setDroppedItems((prevItems) => [
                ...prevItems,
                {
                    ...item,
                    x,
                    y,
                    rotation: 0,
                    width: item.width,
                    height: item.height
                },
            ]);
        }
    };

    const handleSelectItem = (item) => {
        setSelectedItem(item); 
    };

    const handleDeleteItem = () => {
        if (selectedItem) {
            setDroppedItems((prevItems) =>
                prevItems.filter((item) => item.id !== selectedItem.id)
            );
            setSelectedItem(null);
        }
    };

    const handleUpdateItem = (field, value) => {
        if (selectedItem) {
            setDroppedItems((prevItems) =>
                prevItems.map((item) =>
                    item.id === selectedItem.id ? { ...item, [field]: value } : item
                )
            );
        }
    };

    const handleExport = () => {
        const dataStr = JSON.stringify(droppedItems, null, 2);
        const blob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'layout.json';
        link.click();
        URL.revokeObjectURL(url);
    };

    const handleImport = (file) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const data = JSON.parse(e.target.result);
                setDroppedItems(data);
                message.success('Расстановка успешно загружена!');
            } catch (error) {
                message.error('Ошибка при загрузке файла');
            }
        };
        reader.readAsText(file);
        return false; 
    };
    

    return (
        <div className="">
            <Row gutter={16}>
                {/* карточка с объектами */}
                <Col xs={24} sm={24} md={8} lg={10}>
                    <Card>
                        <Tabs 
                            defaultActiveKey="0" 
                            onChange={(key) => setActiveTab(Number(key))}
                            items={ArrayObject.map((tab, index) => ({
                                key: index.toString(),
                                label: tab.title,
                            }))} />
                            <div style={{ display: "flex", overflowX: "auto", gap: 16, padding: 10 }}>
                                {ArrayObject[activeTab].arrayObj.map((item) => (
                                    <div
                                        key={item.id}
                                        draggable
                                        onDragStart={(e) => handleDragStart(e, item)}
                                        style={{ textAlign: "center" }}
                                    >
                                        <img
                                            src={item.img}
                                            alt={item.title}
                                            style={{ cursor: 'pointer', width: 80, height: 80 }}
                                        />
                                        <div>{item.title}</div>
                                    </div>
                                ))}
                            </div>
                    </Card>

                    {/* карточка с параметрами */}
                    <Card title="Параметры элемента" style={{ marginTop: 16 }}>
                        <Form layout="horizontal">
                            <Flex gap={16}>
                                <Form.Item label="X">
                                    <InputNumber style={{ width: 50 }} value={selectedItem?.x} onChange={(value) => handleUpdateItem('x', value)}/>
                                </Form.Item>
                                <Form.Item label="Y">
                                    <InputNumber style={{ width: 50 }} value={selectedItem?.y} onChange={(value) => handleUpdateItem('y', value)} />
                                </Form.Item>
                                <Form.Item label="Угол">
                                    <InputNumber style={{ width: 50 }} value={selectedItem?.rotation} onChange={(value) => handleUpdateItem('rotation', value)}/>
                                </Form.Item>
                                <Form.Item label="Высота">
                                    <InputNumber style={{ width: 50 }} value={selectedItem?.height} onChange={(value) => handleUpdateItem('height', value)} />
                                </Form.Item>
                                <Form.Item label="Ширина">
                                    <InputNumber style={{ width: 50 }}  value={selectedItem?.width} onChange={(value) => handleUpdateItem('width', value)} />
                                </Form.Item>
                                <Form.Item label="Слой">
                                    <InputNumber style={{ width: 50 }} />
                                </Form.Item>
                            </Flex>
                        </Form>
                    </Card>
                {/* Группа кнопок */}
                    <Card style={{ marginTop: 16 }}>
                        <div style={{ display: "flex", justifyContent: "center", gap: "16px" }}>
                            <Button type="primary" icon={<SaveOutlined />} onClick={handleExport}>
                                Сохранить
                            </Button>
                            <Button 
                            onClick={() => setDroppedItems([])}
                            type="danger">
                                Удалить все
                            </Button>
                            <Button
                                onClick={handleDeleteItem}
                                disabled={!selectedItem}
                                icon={<DeleteOutlined />}> 
                                Удалить элемент
                                </Button>
                        </div>
                    </Card>
                    <Upload beforeUpload={handleImport} showUploadList={false}>
                         <Button icon={<UploadOutlined />}>Загрузить</Button>
                    </Upload>
                </Col>
                {/* Карта заведения */}
                <Col xs={24} sm={24} md={16} lg={14}>
                    <Card
                        title={<span style={{ color: "white" }}>Карта заведения</span>}
                        extra={
                            <Flex alignItems="center" gap={8}>
                                <span style={{ color: "white", marginRight: 10 }}>Сетка</span>
                                <Switch size="large" checked={web} onChange={setWeb} />
                            </Flex>
                        }
                        style={{
                            height: "120%",
                            position: "relative",
                            backgroundColor: "black",
                            color: "white",
                        }}
                        onDragOver={handleDragOver}
                        onDrop={handleDrop} >

                        {web && (
                            <div style={{
                                 position: "absolute",
                                 top: 50,
                                 left: 0,
                                 width: "100%",
                                 height: "95%",
                                 backgroundSize: "30px 30px",
                                 backgroundImage:
                                    "linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px), " +
                                    "linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)",
                                }}
                            />
                        )}

                        {droppedItems.map((item, index) => (
                            <img
                                key={index}
                                src={item.img}
                                alt={item.title}
                                onClick={() => handleSelectItem(item)}
                                onDragStart={(e) => handleDragStart(e, item, true)}
                                draggable
                                style={{
                                    position: "absolute",
                                    left: item.x,
                                    top: item.y,
                                    width: item.width,
                                    height: item.height,
                                    transform: `rotate(${item.rotation}deg)`,  
                                    border: selectedItem?.id === item.id ? '2px solid blue' : 'none',
                                    cursor: 'pointer'
                                }}
                            />
                        ))}
                    </Card>
                </Col>

            </Row>
        </div>
    );
};

export default Scheduler;
