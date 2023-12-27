import axios from "axios";
import { useState } from "react";
import { endpointApi } from "../../Endpoint";

const EditComment = ({ comment, onUpdate, onCancel }) => {
  const [editedComment, setEditedComment] = useState(comment.content);

  const handleEditComment = async () => {
    try {
      const response = await axios.put(
        `${endpointApi}/api/comments/${comment._id}`,
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
        style={{ width: "600px" }}
      ></textarea>
      <div className="btnSend">
        <div className="spaceSend"></div>
        <button className="saveBtn" onClick={handleEditComment}>
          Lưu
        </button>
        <button className="cancleBtn" onClick={onCancel}>
          Hủy
        </button>
      </div>
    </div>
  );
};

export default EditComment;
