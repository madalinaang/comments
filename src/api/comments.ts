import jsonData from "./data.json";

interface Data {
  currentUser: User;
  comments: Comm[];
}

const storedData = localStorage.getItem("commentsData");

const data: Data = storedData ? JSON.parse(storedData) : jsonData;
let comments: Comm[] = data.comments;
const currentUser: User = data.currentUser;

const saveToLocalStorage = () => {
  const newData = { currentUser, comments };

  localStorage.setItem("commentsData", JSON.stringify(newData));
};

export const fetchComments = async (): Promise<Comm[]> => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  console.log("fetch comments");

  console.log(comments);

  //   throw new Error("Failed to fetch comments");

  return comments;
};

export const fetchCurrentUser = async (): Promise<User> => {
  await new Promise((resolve) => setTimeout(resolve, 10));
  console.log("fetch user");

  return currentUser;
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

function updateComment(comments: Comm[], id: number, content: string): Comm[] {
  const updatedComments = comments.map((comment) => {
    if (comment.id === id) {
      return {
        ...comment,
        content: content,
      };
    } else if (comment.replies) {
      const updatedReplies = updateComment(comment.replies, id, content);
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

function removeComment(comments: Comm[], id: number): Comm[] {
  const updatedComments = comments.filter((comment) => {
    if (comment.id === id) {
      return false;
    } else {
      if (comment.replies) {
        comment.replies = removeComment(comment.replies, id);
      }
      return true;
    }
  });

  return updatedComments;
}

function addReply(comments: Comm[], id: number, newComment: Comm): Comm[] {
  const updatedComments = comments.map((comment) => {
    if (comment.id === id) {
      return {
        ...comment,
        replies: comment.replies
          ? [...comment.replies, newComment]
          : [newComment],
      };
    } else if (comment.replies) {
      const updatedReplies = addReply(comment.replies, id, newComment);
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

export const editComment = async (
  id: number,
  content: string
): Promise<Comm[]> => {
  await new Promise((resolve) => setTimeout(resolve, 10));
  console.log("edit comment");

  comments = updateComment(comments, id, content);

  saveToLocalStorage();

  return comments;
};

export const verifyCommentCurrentUser = async (
  comment: Comm
): Promise<boolean> => {
  await new Promise((resolve) => setTimeout(resolve, 10));
  console.log("verify user");

  return comment.user.username === currentUser.username;
};

export const addComment = async (comment: Comm, id?: number): Promise<Comm> => {
  await new Promise((resolve) => setTimeout(resolve, 10));
  console.log("add comment");

  if (id === undefined) {
    comments.push(comment);
  } else {
    comments = addReply(comments, id, comment);
  }

  saveToLocalStorage();

  return comment;
};

export const deleteComment = async (id: number) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  console.log("remove comment");

  comments = removeComment(comments, id);

  saveToLocalStorage();
};
