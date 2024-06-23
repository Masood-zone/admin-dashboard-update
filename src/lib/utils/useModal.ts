import { useState } from "react";

export const useModal = () => {
  const [showDelete, setShowDelete] = useState(false);

  const toggleCancel = () => setShowDelete(!showDelete);

  return { showDelete, toggleCancel };
};
