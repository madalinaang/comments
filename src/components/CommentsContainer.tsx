import CommentContainer from "./CommentContainer";

interface CommentsContainerProps {
  comments: Comm[];
}

export default function CommentsContainer({
  comments,
}: CommentsContainerProps) {
  return (
    <section className="comments-container">
      {comments.map((comment) => (
        <CommentContainer key={comment.id} comment={comment} />
      ))}
    </section>
  );
}
