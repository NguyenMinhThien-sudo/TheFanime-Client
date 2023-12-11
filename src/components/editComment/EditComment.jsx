import axios from "axios";
import { useState } from "react";

const EditComment = ({ comment, onUpdate, onCancel }) => {
  const [editedComment, setEditedComment] = useState(comment.content);

  const handleEditComment = async () => {
    try {
      const response = await axios.put(
        `http://localhost:8800/api/comments/${comment._id}`,
        {
          content: editedComment,
        }
      );

      onUpdate(response.data);
    } catch (error) {
      console.error("Error updating comment:", error);
    }
  };
  return (
    <div className="commentInput">
      <textarea
        name="comments"
        id=""
        cols="110"
        rows="3"
        placeholder="Nhập nội dung bình luận của bạn..."
        className="textareaComment"
        value={editedComment}
        onChange={(e) => setEditedComment(e.target.value)}
      ></textarea>
      <div className="btnSend">
        <div className="spaceSend"></div>
        <button onClick={handleEditComment}>Lưu</button>
        <button onClick={onCancel} style={{ backgroundColor: "#ed135d" }}>
          Hủy
        </button>
      </div>
    </div>
  );
};

export default EditComment;
