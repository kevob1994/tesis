import React, { useState } from 'react';
import { Col, Row, Form, Input, Button, Space } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
// fake data generator
const getItems = (count: any) =>
  Array.from({ length: count }, (v, k) => k).map((k) => ({
    id: `item-${k}`,
    content: `item ${k}`,
    title: 'Titulo 1',
    description: 'Descripcion del tema numero 1',
    edit: false,
  }));
const grid = 8;

const getItemStyle = (isDragging: any, draggableStyle: any) => ({
  userSelect: 'none',
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,
  background: isDragging ? '#edf5ff' : 'white',
  ...draggableStyle,
});

const getListStyle = (isDraggingOver: any) => ({
  padding: grid,
});
const reorder = (list: any, startIndex: any, endIndex: any) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const StepCourseProgram = () => {
  const [items, setItems] = useState<any[]>(getItems(2));

  const onDragEnd = (result: any) => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const itemsRes = reorder(
      items,
      result.source.index,
      result.destination.index
    );

    setItems(itemsRes);
  };
  const editThemeCourse = (id: number) => {
    const list = items.map((item, index) => {
      if (id === index) return { ...item, edit: !item.edit };
      return item;
    });
    setItems(list);
  };
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId='droppable'>
        {(provided: any, snapshot: any) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            style={getListStyle(snapshot.isDraggingOver)}
          >
            {items.map((item: any, index: any) => (
              <Draggable key={item.id} draggableId={item.id} index={index}>
                {(provided: any, snapshot: any) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className='item-list'
                    style={getItemStyle(
                      snapshot.isDragging,
                      provided.draggableProps.style
                    )}
                  >
                    {/* {item.content} */}

                    {item.edit ? (
                      <>
                        <Form
                          name='basic'
                          layout='vertical'
                          labelCol={{ span: 8 }}
                          wrapperCol={{ span: 24 }}
                          initialValues={{ remember: true }}
                          // onFinish={onFinish}
                          autoComplete='off'
                          requiredMark={false}
                        >
                          <Row gutter={50}>
                            <Col span={24} flex={1}>
                              <Row align='middle' className='row-item'>
                                <Form.Item
                                  className='input-title-item'
                                  name='firstName'
                                  rules={[
                                    {
                                      required: true,
                                      message: 'Campo requerido',
                                    },
                                  ]}
                                >
                                  <Input
                                    size='large'
                                    // value={firstName}
                                    // onChange={({ target }) =>
                                    //   onChange(target.value, 'firstName')
                                    // }
                                  />
                                </Form.Item>
                                <Space>
                                  <Button
                                    type='primary'
                                    shape='circle'
                                    icon={<EditOutlined />}
                                    size={'large'}
                                    onClick={() => editThemeCourse(index)}
                                  />
                                  <Button
                                    type='primary'
                                    shape='circle'
                                    icon={<DeleteOutlined />}
                                    size={'large'}
                                  />
                                </Space>
                              </Row>
                            </Col>
                          </Row>
                        </Form>
                        <TextArea
                          size='large'
                          autoComplete='biography'
                          // value={"password"}
                          // onChange={({ target }) => onChange(target.value, 'biography')}
                        />
                      </>
                    ) : (
                      <>
                        <Row justify='space-between'>
                          <h2>{item.title}</h2>
                          <Space>
                            <Button
                              type='primary'
                              shape='circle'
                              icon={<EditOutlined />}
                              size={'large'}
                              onClick={() => editThemeCourse(index)}
                            />
                            <Button
                              type='primary'
                              shape='circle'
                              icon={<DeleteOutlined />}
                              size={'large'}
                            />
                          </Space>
                        </Row>
                        <p>{item.description}</p>
                      </>
                    )}
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default StepCourseProgram;
