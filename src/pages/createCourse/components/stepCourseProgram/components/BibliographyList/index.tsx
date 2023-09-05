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
  bibliographyList: IBibliography[];
  setBibliography: Dispatch<SetStateAction<IBibliography[]>>;
  formCourse: CourseFormI;
}

export const BibliographyList: FC<IThematicListProps> = ({
  bibliographyList,
  setBibliography,
  formCourse,
}) => {
  const [form] = Form.useForm();
  const [emptyForm, setEmptyForm] = useState(false);

  const addEvaluation = () => {
    setBibliography([
      ...bibliographyList,
      { author: "", name: "", editorial: "", year: 2023 },
    ]);
  };

  const deleteEvaluation = (i: number) => {
    setBibliography(bibliographyList.filter((thematic, index) => i !== index));
  };

  const onInputChange =
    (key: string, index: number) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newData: any = [...bibliographyList];
      newData[index][key] = e.target.value;

      setBibliography(newData);
    };

  const onInputYearChange =
    (key: string, index: number) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value: inputValue } = e.target;
      const reg = /^-?\d*(\.\d*)?$/;

      const newData: any = [...bibliographyList];
      newData[index][key] = e.target.value;

      if (reg.test(inputValue) || inputValue === "" || inputValue === "-") {
        setBibliography(newData);
      }
    };

  // useEffect(() => {
  //   if (bibliographyList.length === 0)
  //     setBibliography([
  //       ...bibliographyList,
  //       {
  //         content: "",
  //       },
  //     ]);
  // }, []);

  const columns: ColumnProps<IBibliography>[] = [
    {
      title: "Autor",
      dataIndex: "author",
      key: "content",
      render: (text, record, index) => (
        <Input value={text} onChange={onInputChange("author", index)} />
      ),
      width: "20%",
    },
    {
      title: "Nombre del libro",
      dataIndex: "name",
      key: "name",
      render: (text, record, index) => (
        <Input value={text} onChange={onInputChange("name", index)} />
      ),
      width: "20%",
    },
    {
      title: "Editorial",
      dataIndex: "editorial",
      key: "editorial",
      render: (text, record, index) => (
        <Input value={text} onChange={onInputChange("editorial", index)} />
      ),
      width: "20%",
    },
    {
      title: "Año",
      dataIndex: "year",
      key: "year",
      render: (text, record, index) => (
        <Input
          value={text}
          onChange={onInputYearChange("year", index)}
          maxLength={4}
        />
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
    <div style={{ marginTop: 30, marginBottom: 30 }}>
      <div>
        <Row justify='space-between' align='middle'>
          <p className='custom-label'>Bibliografía</p>
          <Button type='primary' onClick={() => addEvaluation()}>
            Agregar Bibliografía
          </Button>
        </Row>

        {emptyForm ? (
          <Alert description='Todos los campos son requeridos' type='error' />
        ) : null}
        <Form form={form} component={false}>
          <Table
            locale={{ emptyText: "Sin Bibliografías" }}
            dataSource={bibliographyList}
            columns={columns}
            pagination={false}
          />
        </Form>
      </div>
    </div>
  );
};
