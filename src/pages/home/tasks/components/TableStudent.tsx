import React, { useEffect, useState } from "react";
import {
  Table,
  Tag,
  Tooltip,
  Button,
  Row,
  Col,
  UploadProps,
  message,
  Upload,
  Spin,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { ColumnProps } from "antd/lib/table";
import {
  DownloadOutlined,
  EditOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import {
  EvaluationFileParamsI,
  EvaluationStudentI,
  StoreI,
} from "../../../../utils/interfaces";
import {
  getListEvaluationsCourseByStudent,
  updateEvaluationFile,
  uploadEvaluationFile,
} from "../../../../actions/course";
import { TypeFiles } from "../../../../utils/const";
import { clientAxios, headerAuthToken } from "../../../../config/axios";
import "./index.scss";
import LoaderSpin from "components/LoaderSpin";

export const TableStudent = () => {
  const [listEvaluations, setListEvaluations] = useState<EvaluationStudentI[]>(
    []
  );
  const [fileList, setFileList] = useState<any[]>([]);
  const [showAssignments, setShowAssignments] = useState<boolean>(false);
  const [selectEvaluation, setSelectEvaluation] = useState<
    EvaluationStudentI | undefined
  >(undefined);
  const { id } = useParams();
  const { evaluationsByStudent, assignments, loadingAction, loading } =
    useSelector((state: StoreI) => state.courses);
  const { user } = useSelector((state: StoreI) => state.auth);
  const dispatch = useDispatch();
  const loadEvaluations = (id: string) =>
    dispatch(getListEvaluationsCourseByStudent(id));

  const saveFile = (params: EvaluationFileParamsI, id_course: string) =>
    dispatch(uploadEvaluationFile(params, id_course));

  const updateFile = (params: EvaluationFileParamsI, id_course: string) =>
    dispatch(updateEvaluationFile(params, id_course));

  useEffect(() => {
    if (!loadingAction) {
      if (id) loadEvaluations(id);
    }
  }, [loadingAction]);

  const props: UploadProps = {
    onRemove: (file: any) => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
    },
    beforeUpload: (file: any) => {
      const type = file.name
        .substr(file.name.lastIndexOf(".") + 1 - file.name.length)
        .toLowerCase();

      const isValidFormat =
        type === TypeFiles.TYPE_PDF ||
        type === TypeFiles.TYPE_WORD ||
        type === TypeFiles.TYPE_EXCEL ||
        type === TypeFiles.TYPE_IMG_PNG ||
        type === TypeFiles.TYPE_IMG_JPEG ||
        type === TypeFiles.TYPE_IMG_JPG;
      if (isValidFormat) {
        setFileList([file]);

        const obj = {
          file,
          id_evaluation: selectEvaluation!.evaluation_id.toString(),
        };

        if (id) saveFile(obj, id);
      } else {
        message.error(
          `${file.name} debe tener formato pdf, word, excel, png, jpg`
        );
      }

      return false;
    },
    fileList,
  };

  const propsUpdate: UploadProps = {
    onRemove: (file: any) => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
    },
    beforeUpload: (file: any) => {
      const type = file.name
        .substr(file.name.lastIndexOf(".") + 1 - file.name.length)
        .toLowerCase();

      const isValidFormat =
        type === TypeFiles.TYPE_PDF ||
        type === TypeFiles.TYPE_WORD ||
        type === TypeFiles.TYPE_EXCEL ||
        type === TypeFiles.TYPE_IMG_PNG ||
        type === TypeFiles.TYPE_IMG_JPEG ||
        type === TypeFiles.TYPE_IMG_JPG;
      if (isValidFormat) {
        setFileList([file]);

        const obj = {
          file,
          id_evaluation: selectEvaluation!.file_id!.toString(),
        };

        if (id) updateFile(obj, id);
      } else {
        message.error(
          `${file.name} debe tener formato pdf, word, excel, png, jpg`
        );
      }

      return false;
    },
    fileList,
  };

  useEffect(() => {
    if (id) loadEvaluations(id);
  }, []);

  useEffect(() => {
    if (evaluationsByStudent) setListEvaluations(evaluationsByStudent);
  }, [evaluationsByStudent]);

  useEffect(() => {
    setShowAssignments(true);
  }, [assignments]);

  const getFileToDownload = (evaluation_id: number, student_id: string) => {
    return clientAxios.get(
      `evaluation/${evaluation_id}/assignment?student_id=${student_id}`,
      {
        responseType: "arraybuffer",
        headers: headerAuthToken(),
      }
    );
  };

  const downloadFile = (evaluation: EvaluationStudentI, student_id: string) => {
    getFileToDownload(evaluation.evaluation_id, student_id).then((response) => {
      const type = response.headers["content-type"];
      const blob = new Blob([response.data], { type: type });
      const link = document.createElement("a");
      link.setAttribute("download", evaluation.evaluation_name);
      link.href = window.URL.createObjectURL(blob);
      // link.download = 'file.xlsx';
      link.click();
    });
  };

  const columnsStudent: ColumnProps<EvaluationStudentI>[] = [
    {
      title: "Evaluación",
      dataIndex: "evaluation_name",
      key: "evaluation_name",
      width: "33%",
    },
    {
      title: "Estado",
      dataIndex: "upload",
      key: "upload",
      width: "33%",
      render: (text, record, index) => {
        return (
          <>
            <div>
              {record.upload ? (
                <Tag color='green'>Entregado</Tag>
              ) : (
                <Tag color='red'>Sin entregar</Tag>
              )}
            </div>
          </>
        );
      },
    },

    {
      title: "Acciones",
      dataIndex: "actions",
      key: "actions",
      width: "33%",
      render: (text, record, index) => {
        return (
          <>
            <div>
              {record.upload ? (
                <div style={{ display: "flex", alignItems: "center" }}>
                  <Upload
                    {...propsUpdate}
                    showUploadList={false}
                    disabled={!record?.evaluation_available}
                  >
                    <div
                      onClick={() => {
                        setSelectEvaluation(record);
                      }}
                    >
                      <Tooltip
                        placement='bottom'
                        title='Modificar archivo (entrega)'
                      >
                        <Button
                          type='primary'
                          shape='circle'
                          icon={<EditOutlined />}
                          size='large'
													disabled={!record?.evaluation_available}
                        />
                      </Tooltip>
                    </div>
                  </Upload>
                  <div
                    style={{ marginLeft: 20 }}
                    onClick={() => downloadFile(record, user!.id.toString())}
                  >
                    <Tooltip placement='bottom' title='Descargar archivo' >
                      <Button
                        type='primary'
                        shape='circle'
                        icon={<DownloadOutlined />}
                        size='large'
												
                      />
                    </Tooltip>
                  </div>
                </div>
              ) : (
                <Upload
                  {...props}
                  showUploadList={false}
                  disabled={!record?.evaluation_available}
                >
                  <div
                    onClick={() => {
                      setSelectEvaluation(record);
                    }}
                  >
                    <Tooltip placement='bottom' title='Subir archivo (entrega)'>
                      <Button
                        type='primary'
                        shape='circle'
                        icon={<UploadOutlined />}
                        size='large'
												disabled={!record?.evaluation_available}
                      />
                    </Tooltip>
                  </div>
                </Upload>
              )}
            </div>
          </>
        );
      },
    },
  ];

  return (
    <div>
      {!loading ? (
        <Row>
          <Col span={24} style={{ padding: "0px 10px" }}>
            <div>
              <Table
                pagination={false}
                columns={columnsStudent}
                dataSource={listEvaluations.map((evaluation) => ({
                  ...evaluation,
                  key: evaluation.evaluation_id,
                }))}
              />
            </div>
          </Col>
        </Row>
      ) : (
        <LoaderSpin />
      )}
    </div>
  );
};
