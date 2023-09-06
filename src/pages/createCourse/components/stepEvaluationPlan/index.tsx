import React, {
  Dispatch,
  FunctionComponent,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import {
  ArrowLeftOutlined,
  ArrowRightOutlined,
  CloseCircleTwoTone,
  CloseOutlined,
} from "@ant-design/icons";
import {
  Alert,
  Button,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
  Table,
} from "antd";
import { ColumnProps } from "antd/lib/table";
import moment from "moment";
import { dateFormat, dateFormatTime } from "utils/const";
import { CourseFormI, ITableEvaluations } from "utils/interfaces";
import "./index.scss";
import { toast } from "react-toastify";

interface IStepEvaluationPlanProps {
  prevStep: () => void;
  nextStep: () => void;
  listEvaluations: ITableEvaluations[];
  setListEvaluations: Dispatch<SetStateAction<ITableEvaluations[]>>;
  openModalCancel: () => void;
  formCourse: CourseFormI;
}

const StepEvaluationPlan: FunctionComponent<IStepEvaluationPlanProps> = ({
  prevStep,
  nextStep,
  openModalCancel,
  listEvaluations,
  setListEvaluations,
  formCourse,
}) => {
  const [form] = Form.useForm();
  const [emptyForm, setEmptyForm] = useState(false);

  const { date_begin, date_finish } = formCourse;

  const addEvaluation = () => {
    setListEvaluations([
      ...listEvaluations,
      {
        name: "",
        description: "",
        type: "",
        date: date_begin.toDate(),
        value: "",
      },
    ]);
  };

  const deleteEvaluation = (i: number) => {
    setListEvaluations(
      listEvaluations.filter((evaluation, index) => i !== index)
    );
  };

  const onInputChange =
    (key: string, index: number) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newData: any = [...listEvaluations];
      newData[index][key] = e.target.value;
      setListEvaluations(newData);
    };

  const dateChange = (
    key: string,
    index: number,
    value?: moment.Moment | undefined
  ) => {
    const newData: any = listEvaluations;
    newData[index][key] = value ? value : new Date();
    setListEvaluations(newData);
  };

  const selectChange = (key: string, index: number, value?: string) => {
    const newData: any = listEvaluations;
    newData[index][key] = value ? value : new Date();
    setListEvaluations(newData);
  };

  const noteChange = (
    key: string,
    index: number,
    value?: string | undefined | number
  ) => {
    const newData: any = [...listEvaluations];
    newData[index][key] = value ? value : "";
    setListEvaluations(newData);
  };

  useEffect(() => {
    if (listEvaluations.length === 0)
      setListEvaluations([
        ...listEvaluations,
        {
          name: "",
          description: "",
          date: date_begin.toDate(),
          value: "",
        },
      ]);
  }, []);

  const columns: ColumnProps<ITableEvaluations>[] = [
    {
      title: "Evaluación",
      dataIndex: "name",
      key: "name",
      render: (text, record, index) => (
        <Input value={text} onChange={onInputChange("name", index)} />
      ),
      width: "20%",
    },
    {
      title: "Descripción",
      dataIndex: "description",
      key: "description",
      render: (text, record, index) => (
        <Input value={text} onChange={onInputChange("description", index)} />
      ),
      width: "45%",
    },
    {
      title: "Fecha",
      dataIndex: "date",
      key: "date",
      render: (text, record, index) => {
        return (
          <DatePicker
            showTime
            size='large'
            placeholder='Seleccione una fecha'
            value={moment(text, dateFormatTime)}
            format={dateFormatTime}
            onChange={(e) => {
              if (e !== null) dateChange("date", index, e);
            }}
            onPanelChange={() => {}}
            disabledDate={(current) => {
              let starDate = moment(date_begin).format("YYYY-MM-DD");
              let endDate = moment(date_finish).format("YYYY-MM-DD");
              return (
                current &&
                (current > moment(endDate, "YYYY-MM-DD").add(1, "day") ||
                  current < moment(starDate, "YYYY-MM-DD"))
              );
            }}
          />
        );
      },
      width: "15%",
    },
    {
      title: "Tipo de evaluación",
      dataIndex: "type",
      key: "type",
      render: (text, record, index) => (
        <Select
          placeholder='Tipo de evaluación'
          style={{ width: "100%" }}
          onChange={(e) => {
            selectChange("type", index, e);
            console.log(e);
          }}
					value={text}
          options={[
            {
              value: "Teórico",
              label: "Teórico",
            },
            {
              value: "Práctico",
              label: "Práctico",
            },
          ]}
        />
      ),
      width: "20%",
    },
    {
      title: "Nota",
      dataIndex: "value",
      key: "value",
      render: (text, record, index) => (
        <InputNumber
          value={text}
          defaultValue={text}
          onChange={(value) => noteChange("value", index, value)}
          type='number'
          min='0'
          step='0'
        />
      ),
      width: "5%",
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

  const submitNext = () => {
    if (validateEvaluationPlanEmpty())
      return toast.error("Todos los campos son requeridos");

    if (validateDate())
      return toast.error(
        "Todas las fechas deben estar entre la fecha de inicio y fecha fin del curso"
      );

    if (listEvaluations.length === 0)
      return toast.error("Requiere al menos una evaluación");

    setEmptyForm(false);
    nextStep();
  };

  const validateEvaluationPlanEmpty = () => {
    const list = listEvaluations
      .map(({ date, description, name, value }: ITableEvaluations) => ({
        date,
        description,
        name,
        value,
      }))
      .filter((evaluation) =>
        Object.values(evaluation).some(
          (x) =>
            x === null ||
            x?.toString().trim() === "" ||
            x === 0 ||
            x === undefined
        )
      );

    return list.length > 0;
  };

  const validateDate = () => {
    const list = listEvaluations.filter((evaluation) => {
      return !(
        moment(evaluation.date).isBetween(date_begin, date_finish) ||
        moment(evaluation.date).isSame(date_begin, "date")
      );
    });
    return list.length > 0;
  };
  return (
    <div className='content'>
      <div className='content-course-form-row '>
        <Row justify='space-between' align='middle'>
          <h1>Plan de Evaluación</h1>
          <Button type='primary' onClick={() => addEvaluation()}>
            Agregar Evaluación
          </Button>
        </Row>
        <p style={{ fontWeight: "bold", color: "gray" }}>
          Fecha inicio: {date_begin.format(dateFormat)}
        </p>
        <div style={{ marginTop: 10, fontWeight: "bold", color: "gray" }}>
          <p>Fecha fin: {date_finish.format(dateFormat)}</p>
        </div>

        {emptyForm ? (
          <Alert description='Todos los campos son requeridos' type='error' />
        ) : null}
        <Form form={form} component={false}>
          <Table
            locale={{ emptyText: "Sin evaluaciones" }}
            dataSource={listEvaluations}
            columns={columns}
            pagination={false}
          />

          <div className='steps-action' style={{ marginTop: 20 }}>
            <Row justify='space-between'>
              <Button
                style={{ margin: "0 8px" }}
                icon={<CloseOutlined />}
                onClick={() => openModalCancel()}
              >
                Cancelar
              </Button>
              <Button
                style={{ margin: "0 8px" }}
                onClick={() => prevStep()}
                icon={<ArrowLeftOutlined />}
              >
                Anterior
              </Button>

              <Button
                type='primary'
                htmlType='submit'
                icon={<ArrowRightOutlined />}
                onClick={() => submitNext()}
              >
                Siguiente
              </Button>
            </Row>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default StepEvaluationPlan;
