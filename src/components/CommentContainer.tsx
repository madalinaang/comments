import Comment from "./Comment";
import RepliesContainer from "./RepliesContainer";

interface CommentContainerProps {
  comment: Comm;
}

export default function CommentContainer({ comment }: CommentContainerProps) {
  return (
    <section className="comment-container">
      <Comment comment={comment} />
      {comment.replies && comment.replies.length > 0 && (
        <RepliesContainer comments={comment.replies} />
      )}
    </section>
  );
}
