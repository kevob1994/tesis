import { SendOutlined, LeftOutlined } from '@ant-design/icons';
import { Button, Col, Image, Input, Row, Spin } from 'antd';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useParams } from 'react-router-dom';
import {
  getCommentsForum,
  getForumInfo,
  newCommentForum,
} from '../../../actions/course/course';
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
        <div className='content-spiner'>
          <Spin />
        </div>
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
                          src={
                            forumSelected.photo ||
                            'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
                          }
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
                  <div className='content-spiner'>
                    <Spin />
                  </div>
                ) : (
                  <>
                    {comments.length <= 0 ? (
                      <>
                        <p>No tiene comentarios</p>
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
