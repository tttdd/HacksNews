import React, { useEffect, useState } from 'react';
import { Author, CommentText } from '../styledComponents';
import './comments-styled.css';
import { Markup } from 'interweave';
import sanitizeHtml from 'sanitize-html';

const CommentsItem = ({ user, content, comments, marginMother, comentCount }) => {
  const [down, setDown] = useState<boolean>(false);
  const [childMargin, setChildMargin] = useState<number>(marginMother);

  useEffect(() => {
    let flag = true;
    if (flag) {
      setChildMargin((prev) => prev + 20);
    }
  }, []);

  return (
    <div>
      <div onClick={() => setDown((prevState) => !prevState)} className={`ml-${childMargin} transition`}>
        <Author>{user}</Author>
        <CommentText>
          <Markup content={sanitizeHtml(content, { allowedTags: false, allowedAttributes: false })} />
        </CommentText>
        <CommentText>
          <b>{`Колличество комментариев: ${comentCount}`}</b>
        </CommentText>
      </div>
      <br />
      <div>
        {down
          ? comments.map((comment) => {
              return (
                <CommentsItem
                  key={comment.id}
                  user={comment.user}
                  content={comment.content}
                  comments={comment.comments}
                  comentCount={comment.comments_count}
                  marginMother={childMargin}
                />
              );
            })
          : null}
      </div>
    </div>
  );
};
export default CommentsItem;
