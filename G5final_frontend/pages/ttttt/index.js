import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Myeditor from '@/components/join/CKEditorTest';

export default function TagsSelect({ maxTags = 3 }) {
  const router = useRouter();
  const [tags, setTags] = useState({});
  const [options, setOptions] = useState([]);
  const [selected, setSelect] = useState([]);

  const [editorLoaded, setEditorLoaded] = useState(false);
  const [data, setData] = useState('');

  useEffect(() => {
    setEditorLoaded(true);
  }, []);

  return (
    <>
      <Myeditor
        name="article"
        onChange={(data) => {
          setData(data);
        }}
        editorLoaded={editorLoaded}
      />
    </>
  );
}
