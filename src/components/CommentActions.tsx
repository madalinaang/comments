interface CommentActionProps {
  reply?: boolean;
  remove?: boolean;
  edit?: boolean;
  onEdit?: () => void;
  onDelete?: () => void;
  onReply?: () => void;
}

export default function CommentActions({
  reply,
  remove,
  edit,
  onEdit,
  onDelete,
  onReply,
}: CommentActionProps) {
  return (
    <div className="comment-actions">
      {reply && onReply && (
        <div className="comment-action" onClick={() => onReply()}>
          <img
            className="action-img"
            src={process.env.PUBLIC_URL + "/images/icon-reply.svg"}
            alt="edit"
          />
          <p className="action-name">Reply</p>
        </div>
      )}
      {remove && onDelete && (
        <div className="comment-action" onClick={() => onDelete()}>
          <img
            className="action-img"
            src={process.env.PUBLIC_URL + "/images/icon-delete.svg"}
            alt="edit"
          />
          <p className="action-name delete">Delete</p>
        </div>
      )}
      {edit && onEdit && (
        <div className="comment-action" onClick={() => onEdit()}>
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
