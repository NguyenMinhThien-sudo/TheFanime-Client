import "./comments.scss";
import ReplyIcon from "@mui/icons-material/Reply";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import axios from "axios";
import { useEffect, useState } from "react";
import EditComment from "../editComment/EditComment";

const Comments = ({ movieID }) => {
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState([]);
  const [editingComment, setEditingComment] = useState(null);
  const user = JSON.parse(localStorage.getItem("user"));

  const handleCommentSubmit = async () => {
    try {
      if (!user || !user.accessToken) {
        console.error("User not logged in or token missing.");
        return;
      }

      const response = await axios.post(
        "http://localhost:8800/api/comments/",
        {
          userId: user._id,
          movieId: movieID,
          content: commentText,
        },
        {
          headers: {
            Authorization: `Bearer ${user.accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      setComments([...comments, response.data]);
      setCommentText("");
    } catch (error) {
      console.error("Error submitting comment:", error);
    }
  };

  const handleDeleteComment = async (commentId) => {
    const confirmDelete = window.confirm(
      "Bạn chắc chắn muốn xóa bình luận này?"
    );
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:8800/api/comments/${commentId}`, {
          headers: {
            Authorization: `Bearer ${user.accessToken}`,
          },
        });
        setComments(comments.filter((comment) => comment._id !== commentId));
      } catch (error) {
        console.error("Error deleting comment:", error);
      }
    }
  };

  const handleEditComment = (comment) => {
    setEditingComment(comment);
  };

  const handleCancelEdit = () => {
    setEditingComment(null);
  };

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8800/api/comments/${movieID}`
        );
        setComments(response.data);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };
    fetchComments();
  }, [movieID, comments]);

  return (
    <>
      <div className="commentTitle">
        <span className="title">Bình Luận</span>
      </div>
      <div className="comments">
        <div className="commentInput">
          <textarea
            name="comments"
            id=""
            cols="110"
            rows="3"
            placeholder="Nhập nội dung bình luận của bạn..."
            className="textareaComment"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
          ></textarea>
          <div className="btnSend">
            <div className="spaceSend"></div>
            <button onClick={handleCommentSubmit}>Gửi</button>
          </div>
        </div>
        {comments.map((comment) => (
          <div className="commentSend" key={comment._id}>
            <div className="userAvata">
              <img src={comment.userId.profilePic} alt="" />
            </div>
            <div className="commentParent">
              <div className="commentHeader">
                <span
                  className="username"
                  style={{
                    color: comment.userId.isAdmin ? "#f25959" : "#57b0b9",
                    fontWeight: comment.userId.isAdmin ? "bold" : "normal",
                  }}
                >
                  {comment.userId.username}
                  {comment.userId.isAdmin ? " (Quản Trị Viên)" : ""}
                </span>
              </div>
              <div className="commentContent">{comment.content}</div>
              <div className="commentFooter">
                <div className="commentReply">
                  <ReplyIcon className="icon" />
                  <span>Trả lời</span>
                </div>
                <ThumbUpIcon className="iconLike" />
                <div className="commentChoosesBox">
                  <span className="commentChooses">...</span>
                  <div className="CommentOptions">
                    <span onClick={() => handleEditComment(comment)}>Sửa</span>
                    <span onClick={() => handleDeleteComment(comment._id)}>
                      Xóa
                    </span>
                  </div>
                </div>
                <span className="commentTime">3 giờ trước</span>
              </div>
            </div>
          </div>
        ))}
        {editingComment && (
          <EditComment
            comment={editingComment}
            onUpdate={(updatedComment) => {
              setComments((prevComments) =>
                prevComments.map((comment) =>
                  comment._id === updatedComment._id ? updatedComment : comment
                )
              );
              setEditingComment(null);
            }}
            onCancel={handleCancelEdit}
          />
        )}
      </div>
    </>
  );
};

export default Comments;
