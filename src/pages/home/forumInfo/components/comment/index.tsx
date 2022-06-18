import { Image, Row } from 'antd';
import moment from 'moment';
import React from 'react';
import { dateFormatTime } from '../../../../../utils/const';
import { CommentI } from '../../../../../utils/interfaces';
import './index.scss';

interface CommentPropsI {
  comment: CommentI;
}

export const Comment = ({ comment }: CommentPropsI) => {
  return (
    <div className='content-comment'>
      <Row align='top'>
        <Image
          preview={false}
          style={{ borderRadius: '50%' }}
          width={50}
          height={50}
          src={
            comment.user_photo ||
            'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'
          }
        />
        <div className='info-user-comment'>
          <h3 className='name-teacher'>{comment.user_name}</h3>
          <p className='date-comment'>
            {moment(comment.created_at).format(dateFormatTime)}
          </p>
        </div>
      </Row>

      <p className='comment-text'>{comment.content}</p>
    </div>
  );
};
