import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default ({ repository, relationKey = "", initialData = {} }) => {
  const { id } = useParams();
  const [message, setMessage] = useState("");
  const [item, setItem] = useState(initialData);
  const [status, setStatus] = useState("edit");

  const getItem = async () => {
    const response = await repository.list({
      query: {
        [relationKey]: id
      }
    });
    if (response.ok && response.data.length) {
      setItem(response.data[0]);
    }
  };

  const isNumber = value => typeof value === "number" || !isNaN(Number(value));

  const onSubmit = async data => {
    const copy = { ...data };
    if (relationKey) {
      copy[relationKey] = isNumber(id) ? +id : id;
    }
    let response;
    if (item.id) {
      response = await repository.update(copy);
    } else {
      response = await repository.create(copy);
    }
    if (response.ok) {
      setItem(response.data);
    } else {
      setMessage(response.message);
    }
    setStatus(response.ok ? "success" : "error");
    setTimeout(() => setStatus("edit"), 4000);
    return response;
  };

  const clearMessage = () => setMessage("");

  useEffect(() => {
    getItem();
  }, [id]);

  return {
    onSubmit,
    getItem,
    status,
    item,
    message,
    clearMessage,
    isNew: !item
  };
};
