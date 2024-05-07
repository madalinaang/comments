import { useEffect, useState } from "react";
import { useChangeScore } from "../hooks/useChangeScore";
import Score from "./Score";
import CommentActions from "./CommentActions";
import { useVerifyUser } from "../hooks/useVerifyUser";

interface CommentProps {
  comment: Comm;
}

export default function Comment({ comment }: CommentProps) {
  const { mutateAsync: changeScore } = useChangeScore();
  const [score, setScore] = useState<number>(comment.score);
  const { mutateAsync: verifyUser } = useVerifyUser();
  const [yourComment, setYourComment] = useState<boolean>(false);

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
            />
          </div>
        </div>
        <p>
          {comment.replyingTo && (
            <span className="replying-to">@{comment.replyingTo} </span>
          )}
          {comment.content}
        </p>
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
          />
        </div>
      </div>
    </article>
  );
}
