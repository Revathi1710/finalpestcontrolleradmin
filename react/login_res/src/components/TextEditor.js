import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const TextEditor = () => {
  const [content, setContent] = useState("");

  // Function to insert a table manually
  const insertTable = () => {
    const tableHTML = `
      <table border="1" style="width: 100%; border-collapse: collapse;">
        <tr>
          <th>Header 1</th>
          <th>Header 2</th>
          <th>Header 3</th>
        </tr>
        <tr>
          <td>Row 1, Col 1</td>
          <td>Row 1, Col 2</td>
          <td>Row 1, Col 3</td>
        </tr>
        <tr>
          <td>Row 2, Col 1</td>
          <td>Row 2, Col 2</td>
          <td>Row 2, Col 3</td>
        </tr>
      </table>
    `;
    setContent(content + tableHTML);
  };

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["blockquote", "code-block"],
      [{ align: [] }],
      ["clean"],
    ],
  };

  return (
    <div className="container mt-3">
      <h4>Rich Text Editor with Table Support</h4>
      <button onClick={insertTable} className="btn btn-primary mb-2">
        Insert Table
      </button>
      <ReactQuill value={content} onChange={setContent} modules={modules} theme="snow" />
      <div className="mt-3">
        <h5>Preview:</h5>
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </div>
    </div>
  );
};

export default TextEditor;
