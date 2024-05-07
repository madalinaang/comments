interface CommentActionProps {
  reply?: boolean;
  remove?: boolean;
  edit?: boolean;
}

export default function CommentActions({
  reply,
  remove,
  edit,
}: CommentActionProps) {
  return (
    <div className="comment-actions">
      {reply && (
        <div className="comment-action">
          <img
            className="action-img"
            src={process.env.PUBLIC_URL + "/images/icon-reply.svg"}
            alt="edit"
          />
          <p className="action-name">Reply</p>
        </div>
      )}
      {remove && (
        <div className="comment-action">
          <img
            className="action-img"
            src={process.env.PUBLIC_URL + "/images/icon-delete.svg"}
            alt="edit"
          />
          <p className="action-name delete">Delete</p>
        </div>
      )}
      {edit && (
        <div className="comment-action">
          <img
            className="action-img"
            src={process.env.PUBLIC_URL + "/images/icon-edit.svg"}
            alt="edit"
          />
          <p className="action-name">Edit</p>
        </div>
      )}
    </div>
  );
}
