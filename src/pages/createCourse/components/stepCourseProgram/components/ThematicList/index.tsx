import React, {
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { CloseCircleTwoTone } from "@ant-design/icons";
import { Alert, Button, Form, Input, Row, Table } from "antd";
import { ColumnProps } from "antd/lib/table";
import { CourseFormI, IBibliography, IThematic } from "utils/interfaces";

import { toast } from "react-toastify";

interface IThematicListProps {
  thematicList: IThematic[];
  setThematicList: Dispatch<SetStateAction<IThematic[]>>;
  formCourse: CourseFormI;
  showError?: boolean;
}

export const ThematicList: FC<IThematicListProps> = ({
  thematicList,
  setThematicList,
  showError,
}) => {
  const [form] = Form.useForm();
  const [emptyForm, setEmptyForm] = useState(false);

  const addEvaluation = () => {
    setThematicList([
      ...thematicList,
      {
        content: "",
        activity: "",
      },
    ]);
  };

  const deleteEvaluation = (i: number) => {
    setThematicList(thematicList.filter((thematic, index) => i !== index));
  };

  const onInputChange =
    (key: string, index: number) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newData: any = [...thematicList];
      newData[index][key] = e.target.value;
      setThematicList(newData);
    };

  // useEffect(() => {
  //   if (thematicList.length === 0)
  //     setThematicList([
  //       ...thematicList,
  //       {
  //         content: "",
  //       },
  //     ]);
  // }, []);

  const columns: ColumnProps<IThematic>[] = [
    {
      title: "Temática",
      dataIndex: "content",
      key: "content",
      render: (text, record, index) => (
        <Input value={text} onChange={onInputChange("content", index)} />
      ),
      width: "20%",
    },
    {
      title: "Actividad",
      dataIndex: "activity",
      key: "activity",
      render: (text, record, index) => (
        <Input value={text} onChange={onInputChange("activity", index)} />
      ),
      width: "20%",
    },
    {
      title: "Eliminar",
      dataIndex: "delete",
      key: "delete",
      render: (text, record, index) => (
        <CloseCircleTwoTone
          twoToneColor='#E2222E'
          className='close-btn'
          onClick={() => deleteEvaluation(index)}
        />
      ),
      width: "1%",
    },
  ];

  return (
    <div>
      <div style={{ marginBottom: 30 }}>
        <Row justify='space-between' align='middle'>
          <p className='custom-label'>Contenido temático</p>
          <Button type='primary' onClick={() => addEvaluation()}>
            Agregar Contenido temático
          </Button>
        </Row>

        {emptyForm ? (
          <Alert description='Todos los campos son requeridos' type='error' />
        ) : null}
        <Form form={form} component={false}>
          <Table
            locale={{ emptyText: "Sin contenido temático" }}
            dataSource={thematicList}
            columns={columns}
            pagination={false}
          />
          {showError && (
            <p style={{ color: "#ff4d4f" }}>
              Debe tener al menos un contenido temático
            </p>
          )}
        </Form>
      </div>
    </div>
  );
};
