import React from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

export default function CKEditorComponent({ placeholder = '' }) {
  return (
    <div>
      <CKEditor
        editor={ClassicEditor}
        data=""
        config={{
          placeholder: `${placeholder}`, // 設定 placeholder
        }}
        onReady={(editor) => {
          console.log('Editor is ready to use!', editor);
        }}
        onChange={(event, editor) => {
          const data = editor.getData();
          console.log({ event, editor, data });
        }}
      />
    </div>
  );
}
