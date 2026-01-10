// src/hooks/useFilePreview.js
import { useEffect, useState } from "react";

export default function useFilePreview(file) {
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    if (!file) {
      setPreview(null);
      return;
    }

    const reader = new FileReader();
    reader.onload = () => setPreview(reader.result);
    reader.readAsDataURL(file);

    return () => {
      // abort the reader if possible to avoid memory leaks
      if (reader.readyState === 1) reader.abort();
    };
  }, [file]);

  return preview;
}
