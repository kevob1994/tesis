import React, {
	Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import {                
  CloseCircleTwoTone,
} from "@ant-design/icons";
import {
  Alert,
  Button,
  Form,
  Input,
  Row,
  Table,
} from "antd";
import { ColumnProps } from "antd/lib/table";
import { CourseFormI, ISpecificGoals } from "utils/interfaces";


interface ISpecificGoalsProps {
  specificGoals: ISpecificGoals[];
  setSpecificGoals: Dispatch<SetStateAction<ISpecificGoals[]>>;
  formCourse: CourseFormI;
}

export const SpecificGoals: FC<ISpecificGoalsProps> = ({
  specificGoals,
  setSpecificGoals,
  formCourse,
}) => {
  const [form] = Form.useForm();
  const [emptyForm, setEmptyForm] = useState(false);


  const addEvaluation = () => {
    setSpecificGoals([
      ...specificGoals,
      {
        goal: "",
      },
    ]);
  };

  const deleteEvaluation = (i: number) => {
    setSpecificGoals(specificGoals.filter((thematic, index) => i !== index));
  };

  const onInputChange =
    (key: string, index: number) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newData: any = [...specificGoals];
      newData[index][key] = e.target.value;
      setSpecificGoals(newData);
    };

  const columns: ColumnProps<ISpecificGoals>[] = [
    {
      title: "Objetivo específico",
      dataIndex: "goal",
      key: "goal",
      render: (text, record, index) => (
        <Input value={text} onChange={onInputChange("goal", index)} />
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
      <div style={{marginTop: 30}}>
        <Row justify='space-between' align='middle'>
				<p className="custom-label">Objetivos específicos</p>
          <Button type='primary' onClick={() => addEvaluation()}>
            Agregar Objetivo
          </Button>
        </Row>

        {emptyForm ? (
          <Alert description='Todos los campos son requeridos' type='error' />
        ) : null}
        <Form form={form} component={false}>
          <Table
            locale={{ emptyText: "Sin objetivos específicos" }}
            dataSource={specificGoals}
            columns={columns}
            pagination={false}
          />
        </Form>
      </div>
    </div>
  );
};
