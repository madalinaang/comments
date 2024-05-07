import { useState } from "react";
import Comment from "./Comment";
import RepliesContainer from "./RepliesContainer";
import WriteComment from "./WriteComment";

interface CommentContainerProps {
  comment: Comm;
}

export default function CommentContainer({ comment }: CommentContainerProps) {
  const [addReply, setAddReply] = useState<boolean>(false);

  const replyToComment = () => {
    setAddReply(true);
  };

  const replyAdded = () => {
    setAddReply(false);
  };

  return (
    <section className="comment-container">
      <Comment comment={comment} reply={replyToComment} />
      {comment.replies && comment.replies.length > 0 && (
        <RepliesContainer comments={comment.replies} />
      )}
      {addReply && (
        <WriteComment
          id={comment.id}
          replyTo={comment.user.username}
          replyAdded={replyAdded}
        />
      )}
    </section>
  );
}
