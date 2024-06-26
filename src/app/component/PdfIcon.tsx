import React from "react";
interface Props {
  onClick: () => void;
}
export default function PdfIcon({ onClick }: Props) {
  return (
    <div>
      <img
        onClick={() => onClick()}
        style={{ cursor: "pointer" }}
        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAACXBIWXMAAAsTAAALEwEAmpwYAAACD0lEQVR4nGNgGAWjYBCD/6v28/xfc2LJ/zUnzpCDv+S37v4fWs9GOweuPZb7f+2J/+Ti98Hp/9+4Rz78n5vLTiMHHm+g1IHP1cz+v3WLfPy/vp5j0DrwOa0cSU0HPqeFI6ntwOfUdiQtHPicmo6k2IEhGVgdCMJvPKMf/c+dyD6gDvxWORGnA6niSEod+H/tif+/Jq36/71hOk78s3dZ04A68D9BfLxh1IH/R0OQhDT4q3/5/0+pVf8/pVb//1rS/f/v4r3//608AhWr+v8lt/n/j5Y5//+vOQZW/71x5v9PadVg/Dm7kfZp8GtR5/8Xmlb/PyVX/H9l5vH/jWPI/39L90MKYO/Y/+8DUv4/17D8/8434f//Ncf/f4jM+//S2Pn/x5iC/58Sy+jkQF1bMPtLQdv/5xoW//8t2Qt2ICi0wOVf7WQw/9eElWAHvnWNoF8uhodgYtn/lyYu/98HpcJDEObAP3O3Q/kzwA4EqX9p7ApWSx8Haln9/5LXAnHQ6mMYDvxeNxXM/z11PdiBr+0C/v/qW/7/9/QN9I3i/1AMc+D7wFRIiGlb//8QlQ+Wo3sU/+xa9P9jYimqA1ccBmcCcEZIqYLkYlh9XD3p/5f81tGa5P9oXUwOGG3NrB1tbp0YbbAO8Uyy5kQO7R14Ipt8By66wP1/7fFF5A6//SeIjy8E2UG2A0fBKGCgPQAATZYYGUqW9DIAAAAASUVORK5CYII="
      />
    </div>
  );
}
