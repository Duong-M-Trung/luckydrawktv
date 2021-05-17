import React from 'react'
import { Table } from 'antd'
import { sortableContainer, sortableElement, sortableHandle } from 'react-sortable-hoc';
import { MenuOutlined } from '@ant-design/icons';
import arrayMove from 'array-move';

const columns = [
  {
    title: 'Sort',
    dataIndex: 'sort',
    width: 30,
    className: 'drag-visible',
    render: () => <DragHandle />,
  },
  {
    title: 'Name',
    dataIndex: 'name',
    className: 'drag-visible',
  },
  {
    title: 'Age',
    dataIndex: 'age',
  },
  {
    title: 'Address',
    dataIndex: 'address',
  },
];

const data = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    index: 0,
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    index: 1,
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    index: 2,
  },
];
const SortableItem = sortableElement(props => <tr {...props} />);
const SortableContainer = sortableContainer(props => <tbody {...props} />);

onSortEnd = ({ oldIndex, newIndex }) => {
  const { dataSource } = this.state;
  if (oldIndex !== newIndex) {
    const newData = arrayMove([].concat(dataSource), oldIndex, newIndex).filter(el => !!el);
    console.log('Sorted items: ', newData);
    this.setState({ dataSource: newData });
  }
};

DraggableContainer = props => (
  <SortableContainer
    useDragHandle
    disableAutoscroll
    helperClass="row-dragging"
    onSortEnd={this.onSortEnd}
    {...props}
  />
);

const Awards = () => {
  const DragHandle = sortableHandle(() => <MenuOutlined style={{ cursor: 'grab', color: '#999' }} />);
  return (
    <div>

    </div>
  )
}

export default Awards
