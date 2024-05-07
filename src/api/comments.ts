import jsonData from "./data.json";

interface Data {
  currentUser: User;
  comments: Comm[];
}

const storedData = localStorage.getItem("commentsData");

const data: Data = storedData ? JSON.parse(storedData) : jsonData;
let comments: Comm[] = data.comments;
const currentUser = data.currentUser;

const saveToLocalStorage = () => {
  const newData = { currentUser, comments };

  localStorage.setItem("commentsData", JSON.stringify(newData));
};

export const fetchComments = async (): Promise<Comm[]> => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  console.log("fetch comments");

  //   throw new Error("Failed to fetch comments");

  return comments;
};

function updateCommentScore(
  comments: Comm[],
  id: number,
  score: number
): Comm[] {
  const updatedComments = comments.map((comment) => {
    if (comment.id === id) {
      return {
        ...comment,
        score: score,
      };
    } else if (comment.replies) {
      const updatedReplies = updateCommentScore(comment.replies, id, score);
      if (updatedReplies !== comment.replies) {
        return {
          ...comment,
          replies: updatedReplies,
        };
      }
    }
    return comment;
  });

  return updatedComments;
}

export const changeScore = async (
  id: number,
  score: number
): Promise<Comm[]> => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  console.log("change scores");

  comments = updateCommentScore(comments, id, score);

  saveToLocalStorage();

  return comments;
};

export const verifyCommentCurrentUser = async (
  comment: Comm
): Promise<boolean> => {
  await new Promise((resolve) => setTimeout(resolve, 10));
  console.log("verify user");

  console.log(comment.user.username);

  return comment.user.username === currentUser.username;
};
