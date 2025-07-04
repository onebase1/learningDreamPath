"use client";

import { useEffect, useState } from "react";
import { Bold, Italic, Underline, List, ListOrdered, AlignLeft, AlignCenter, AlignRight } from "lucide-react";
import dynamic from "next/dynamic";

// Import Quill with dynamic import to avoid SSR issues
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import 'react-quill/dist/quill.snow.css';

interface EditorProps {
  onChange: (value: string) => void;
  initialContent?: string;
  placeholder?: string;
}

const Editor = ({
  onChange,
  initialContent = "",
  placeholder = "Start writing..."
}: EditorProps) => {
  const [isMounted, setIsMounted] = useState(false);
  const [content, setContent] = useState(initialContent);

  // Wait until component is mounted to render ReactQuill
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Handle content change
  const handleChange = (value: string) => {
    setContent(value);
    onChange(value);
  };

  // Quill editor modules configuration
  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      [{ 'align': [] }],
      ['clean']
    ],
  };

  // Quill editor formats
  const formats = [
    'header',
    'bold', 'italic', 'underline',
    'list', 'bullet',
    'align'
  ];

  if (!isMounted) {
    return (
      <div className="h-64 w-full bg-gray-100 rounded-md animate-pulse"></div>
    );
  }

  return (
    <div className="editor-container">
      <ReactQuill
        theme="snow"
        value={content}
        onChange={handleChange}
        modules={modules}
        formats={formats}
        placeholder={placeholder}
        className="min-h-[200px]"
      />
    </div>
  );
};

export default Editor;