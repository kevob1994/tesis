import { SendOutlined, LeftOutlined } from '@ant-design/icons';
import { Button, Col, Image, Input, Row, Spin } from 'antd';
import LoaderSpin from 'components/LoaderSpin';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useParams } from 'react-router-dom';
import {
  getCommentsForum,
  getForumInfo,
  newCommentForum,
} from '../../../actions/course';
import { dateFormat } from '../../../utils/const';
import { ForumI, StoreI } from '../../../utils/interfaces';
import { Comment } from './components/comment';
import './index.scss';

const ForumInfoPage = () => {
  const { pathname } = useLocation();
  const location = useLocation();
  const { id_forum } = useParams();
  const [imageUrl2, setImageUrl2] = useState<any>();
  const [info, setInfo] = useState<ForumI | null>();
  const [comment, setComment] = useState('');
  const {
    loadingAction,
    forum,
    loading,
    forumSelected,
    loadingComments,
    comments,
  } = useSelector((store: StoreI) => store.courses);
  const dispatch = useDispatch();

  const addNewComment = (newComment: string, forum_id: number) =>
    dispatch(newCommentForum(newComment, forum_id));

  const loadComments = (forum_id: number) =>
    dispatch(getCommentsForum(forum_id));

  const loadInfoForum = (forum_id: number) => dispatch(getForumInfo(forum_id));

  useEffect(() => {
    if (id_forum) {
      setInfo(forum.find((item) => item.id === +id_forum));
      loadInfoForum(+id_forum);
      loadComments(+id_forum);
    }
  }, []);

  useEffect(() => {
    if (!loadingAction) {
      setComment('');
    }
  }, [loadingAction]);

  const handlerComment = () => {
    if (id_forum) addNewComment(comment, +id_forum);
  };

  return (
    <div className='forum-container'>
      {loading ? (
        <LoaderSpin />
      ) : (
        <>
          <Link to={pathname.substring(0, pathname.length - 2)}>
            <Button
              type='text'
              icon={<LeftOutlined />}
              size='large'
              style={{ width: 'fit-content' }}
            >
              Regresar
            </Button>
          </Link>
          {forumSelected && (
            <>
              <Row gutter={40}>
                <Col span={24}>
                  <div className='content-forum-info'>
                    <div className='info'>
                      <Row>
                        <Image
                          preview={false}
                          width={350}
                          height={200}
													fallback='data:image/png;base64,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'
													src={forumSelected.photo || "error"}
                        />
                        <Row className='info-course'>
                          <div>
                            <h2>{forumSelected?.name}</h2>
                            <p className='description-forum'>
                              {forumSelected?.description}
                            </p>
                          </div>
                          <Row align='middle'>
                            <Image
                              preview={false}
                              width={50}
                              height={50}
                              src={
                                forumSelected.user_photo ||
                                'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'
                              }
                            />
                            <h3 className='name-teacher'>
                              {forumSelected.user_name}
                            </h3>
                            <div className='ellipse'></div>
                            <p className='date'>
                              Creado el{' '}
                              {moment(
                                new Date(forumSelected?.created_at)
                              ).format(dateFormat)}
                            </p>
                          </Row>
                        </Row>
                      </Row>
                    </div>
                  </div>
                </Col>
              </Row>
              <div
                style={{
                  padding: 20,
                  overflowY: 'scroll',
                  height: '100%',
                  paddingBottom: 0,
                }}
              >
                {loadingComments ? (
                  <LoaderSpin />
                ) : (
                  <>
                    {comments.length <= 0 ? (
                      <>
                        <p
                          style={{
                            textAlign: 'center',
                            padding: 20,
                            fontWeight: 'bold',
                            fontSize: '1.5rem',
                          }}
                        >
                          No tiene comentarios
                        </p>
                      </>
                    ) : (
                      comments.map((comment) => <Comment comment={comment} />)
                    )}
                  </>
                )}

                <div className='input-chat'>
                  <Input
                    size='large'
                    autoComplete='message'
                    value={comment}
                    placeholder='Nuevo comentario'
                    onChange={(e) => {
                      setComment(e.target.value);
                    }}
                  />
                  <Button
                    type='primary'
                    icon={<SendOutlined />}
                    size='large'
                    onClick={handlerComment}
                    loading={loadingAction}
                    disabled={comment === '' && !comment}
                  >
                    Comentar
                  </Button>
                </div>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default ForumInfoPage;
