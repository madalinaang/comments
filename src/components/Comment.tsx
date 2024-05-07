import { ChangeEvent, KeyboardEvent, useEffect, useState } from "react";
import { useChangeScore } from "../hooks/useChangeScore";
import Score from "./Score";
import CommentActions from "./CommentActions";
import { useVerifyUser } from "../hooks/useVerifyUser";
import { useUpdateComment } from "../hooks/useUpdateComment";
import { useDeleteComment } from "../hooks/useDeleteComment";

interface CommentProps {
  comment: Comm;
  reply: () => void;
}

export default function Comment({ comment, reply }: CommentProps) {
  const { mutateAsync: changeScore } = useChangeScore();
  const [score, setScore] = useState<number>(comment.score);
  const { mutateAsync: verifyUser } = useVerifyUser();
  const [yourComment, setYourComment] = useState<boolean>(false);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [content, setContent] = useState<string>("");
  const { mutateAsync: updateComment } = useUpdateComment();
  const { mutateAsync: deleteComment } = useDeleteComment();

  const incrementScore = async () => {
    setScore((prev) => prev + 1);
    await changeScore({ id: comment.id, score: score + 1 });
  };

  const decrementScore = async () => {
    setScore((prev) => prev - 1);
    await changeScore({ id: comment.id, score: score - 1 });
  };

  useEffect(() => {
    const verify = async () => {
      const result = await verifyUser(comment);
      setYourComment(result);
    };

    verify();
  }, [comment, verifyUser]);

  const enableEdit = () => {
    setEditMode(true);
    setContent(
      (comment.replyingTo ? "@" + comment.replyingTo + " " : "") +
        comment.content
    );
  };

  const onDelete = async () => {
    await deleteComment(comment.id);
  };

  const onTextAreaChanged = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
    // setContent();
  };

  const onAreaChangedEnter = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      editComment();
    }
  };

  const editComment = async () => {
    const value = content.replace("@" + comment.replyingTo + " ", "");
    await updateComment({ id: comment.id, content: value });
    setEditMode(false);
  };

  return (
    <article className="comment">
      <div className="desktop-comment">
        <Score
          score={score}
          increment={incrementScore}
          decrement={decrementScore}
          type="vertical"
        />
      </div>
      <div className="left-side">
        <div className="top-bar">
          <img
            className="avatar"
            src={process.env.PUBLIC_URL + comment.user.image.png}
            alt="avatar"
          />
          <h5>{comment.user.username}</h5>
          {yourComment && <div className="you">you</div>}
          <p className="date">{comment.createdAt}</p>
          <div className="desktop-comment actions-desktop-comment">
            <CommentActions
              reply={!yourComment}
              remove={yourComment}
              edit={yourComment}
              onEdit={enableEdit}
              onDelete={onDelete}
              onReply={reply}
            />
          </div>
        </div>
        {editMode ? (
          <div className="edit-content">
            <textarea
              value={content}
              onChange={onTextAreaChanged}
              onKeyDown={onAreaChangedEnter}
            />
            <button onClick={() => editComment()}>Update</button>
          </div>
        ) : (
          <p>
            {comment.replyingTo && (
              <span className="replying-to">@{comment.replyingTo} </span>
            )}
            {comment.content}
          </p>
        )}

        <div className="bottom-bar">
          <Score
            score={score}
            increment={incrementScore}
            decrement={decrementScore}
            type="horizontal"
          />
          <CommentActions
            reply={!yourComment}
            remove={yourComment}
            edit={yourComment}
            onEdit={enableEdit}
            onDelete={onDelete}
            onReply={reply}
          />
        </div>
      </div>
    </article>
  );
}
