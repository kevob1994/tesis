import {
  DeleteOutlined,
  EditOutlined,
  EyeFilled,
  EyeOutlined,
  LaptopOutlined,
  MoreOutlined,
  ShareAltOutlined,
} from "@ant-design/icons";
import { Button, Dropdown, Menu } from "antd";
import React, { FunctionComponent } from "react";
import { listItemsI } from "utils/interfaces";

interface MenuItemPropsI {
  item: listItemsI;
  shareElement?: (code: string) => void;
  deleteItem?: (id: listItemsI) => void;
  editItem?: (id: number) => void;
  textDelete?: string;
  handlerShare: (code: string) => void;
  goItem: () => void;
  textGoItem: string;
}

export const MenuItem: FunctionComponent<MenuItemPropsI> = ({
  item,
  shareElement,
  deleteItem,
  editItem,
  handlerShare,
  goItem,
	textGoItem
}) => {
  const menu = (
    <Menu>
      
        <Menu.Item
          key='view'
          icon={<EyeOutlined />}
          onClick={(e) => {
            goItem();
          }}
        >
          {textGoItem}
        </Menu.Item>
      
      {shareElement && (
        <Menu.Item
          key='share'
          icon={<ShareAltOutlined />}
          onClick={(e) => {
            if (item.code) handlerShare(item.code);
          }}
        >
          Compartir
        </Menu.Item>
      )}
      {editItem && (
        <Menu.Item
          key='edit'
          icon={<EditOutlined />}
          onClick={(e) => {
            editItem(item.id);
          }}
        >
          Editar
        </Menu.Item>
      )}
      {deleteItem && (
        <Menu.Item
          key='delete'
          icon={<DeleteOutlined />}
          onClick={(e) => {
            deleteItem(item);
          }}
        >
          Eliminar
        </Menu.Item>
      )}
    </Menu>
  );
  return (
    <Dropdown overlay={menu} placement='bottomCenter' trigger={["click"]}>
      <Button
        type='primary'
        shape='circle'
        icon={<MoreOutlined />}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
        size='large'
      />
    </Dropdown>
  );
};
