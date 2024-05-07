import Comment from "./Comment";

interface RepliesContainerProps {
  comments: Comm[];
}

export default function RepliesContainer({ comments }: RepliesContainerProps) {
  return (
    <section className="replies-container">
      <div className="line" />
      <div className="replies">
        {comments.map((comment) => (
          <Comment key={comment.id} comment={comment} />
        ))}
      </div>
    </section>
  );
}
