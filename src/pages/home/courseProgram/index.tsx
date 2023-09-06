import { getCourse, getProgram } from "actions/course";
import LoaderSpin from "components/LoaderSpin";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { StoreI } from "../../../utils/interfaces";
import "./index.scss";
import { Col, Image, List, Row } from "antd";
import { categoryClass, dateFormat } from "utils/const";
import moment from "moment";

const CourseProgramPage = () => {
  const { program, loading, infoCourse } = useSelector(
    (state: StoreI) => state.courses
  );
  const dispatch = useDispatch();
  const { id } = useParams();

  const getCourseData = (id: string) => dispatch(getCourse(id));

  useEffect(() => {
    if (id) getCourseData(id);
  }, [id]);

  console.log("infoCourse");
  console.log(infoCourse);
  console.log(
    infoCourse
      ? moment(new Date(infoCourse.course.date_begin), dateFormat)
      : null
  );
  return (
    <div>
      <h1>Contenido de la materia</h1>
      {loading && !infoCourse ? (
        <LoaderSpin />
      ) : (
        <>
          <Row gutter={20}>
            <Col span={5} flex={1}>
              <Image
                preview={false}
                src={
                  infoCourse?.course.photo ? infoCourse?.course.photo : "error"
                }
                alt='avatar'
                width={300}
                height={200}
                fallback='data:image/png;base64,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'
              />
              <div style={{ marginTop: 20, marginBottom: 40 }}>
                <p className='text-info'>
                  Nombre completo del curso:{" "}
                  <span>{infoCourse?.course.full_name}</span>
                </p>
                <p className='text-info'>
                  Nombre corto del curso:{" "}
                  <span>{infoCourse?.course.short_name}</span>
                </p>
                <p className='text-info'>
                  Categoria:{" "}
                  <span>
                    {
                      categoryClass.find(
                        (x) => x.id === Number(infoCourse?.course.category)
                      )?.category
                    }
                  </span>
                </p>
                <p className='text-info'>
                  Fecha inicio:{" "}
                  <span>
                    {infoCourse?.course?.date_begin &&
                      moment(new Date(infoCourse.course.date_begin)).format(
                        dateFormat
                      )}
                  </span>
                </p>
                <p className='text-info'>
                  Fecha fin:{" "}
                  <span>
                    {infoCourse?.course?.date_finish &&
                      moment(new Date(infoCourse.course.date_finish)).format(
                        dateFormat
                      )}
                  </span>
                </p>
                <p className='text-info'>
                  Descripción: <span>{infoCourse?.course.description}</span>
                </p>
              </div>
            </Col>
            <Col span={18} flex={1}>
              <div style={{ marginBottom: 40 }}>
                <div style={{ paddingLeft: 15 }}>
                  <div className='content-text'>
                    <h2>Fundamentos</h2>
                    <p>{infoCourse?.infocourse.fundament}</p>
                  </div>

                  <div className='content-text'>
                    {" "}
                    <h2>Objetivos</h2>
                    <p>{infoCourse?.infocourse.main_goal}</p>
                  </div>

                  <div className='content-text'>
                    {" "}
                    <h2>Competencia</h2>
                    <p>{infoCourse?.infocourse.competence}</p>
                  </div>
                  <div className='content-text'>
                    {" "}
                    <h2>Tipos de actividades</h2>
                    <p>{infoCourse?.infocourse.activity}</p>
                  </div>
                  <div className='content-text'>
                    {" "}
                    <List
                      size='small'
                      header={<h3>Contenido temático</h3>}
                      bordered
                      dataSource={infoCourse?.thematiccontents}
                      renderItem={(item) => (
                        <List.Item>{item.content}</List.Item>
                      )}
                    />
                  </div>
                  <div className='content-text'>
                    <List
                      size='small'
                      header={<h3>Objetivos específicos</h3>}
                      bordered
                      dataSource={infoCourse?.specific_goals}
                      renderItem={(item) => <List.Item>{item.goal}</List.Item>}
                    />
                  </div>
                  <div className='content-text'>
                    <List
                      size='small'
                      header={<h3>Bibliografía</h3>}
                      bordered
                      dataSource={infoCourse?.bibliographies}
                      renderItem={(item) => (
                        <List.Item>
                          <div>
                            <div>
                              <span>Título:</span>&nbsp;
                              {` ${item.name}`}
                            </div>
                            <div>
                              <span>Autor:</span>&nbsp;
                              {item.author}&nbsp;&nbsp;&nbsp;&nbsp;
                              <span>Editorial:</span>&nbsp;
                              {item.editorial}&nbsp;&nbsp;&nbsp;&nbsp;
                              <span>Año:</span>&nbsp;
                              {item.year}
                            </div>
                          </div>
                        </List.Item>
                      )}
                    />
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </>
      )}
    </div>
  );
};

export default CourseProgramPage;
