import { useForm } from "react-hook-form";
import { Tag } from "../../models/Tag";
import useTagService from "../../services/tagService";
import "./TagsForm.scss";
import { useState } from "react";

interface props {}

function TagsForm(props: props): JSX.Element {
  const { register, handleSubmit, reset } = useForm<Tag>();
  const [isAdded, setIsAdded] = useState(false);
  const tagService = useTagService();

  const submitForm = (tag: Tag) => {
    tagService.addTag(tag).then((res) => reset());
    setIsAdded(true);
  };

  return (
    <form className="TagsForm" onSubmit={handleSubmit(submitForm)}>
      <h4 className="tags-header">Add Tag</h4>
      <label htmlFor="name" className="event-form-label">
        Tag Name
      </label>
      <input
        id="name"
        type="text"
        className="event-form-input"
        maxLength={60}
        required
        {...register("name")}
      />
      <label htmlFor="hebrew" className="event-form-label">
        Hebrew Name
      </label>
      <input
        id="hebrew"
        type="text"
        className="event-form-input"
        maxLength={60}
        required
        {...register("hebrew")}
      />
      <label htmlFor="color" className="event-form-label">
        Color RGB - rgb(255,255,255)
      </label>
      <input
        id="color"
        type="text"
        className="event-form-input"
        maxLength={60}
        required
        {...register("color")}
      />
      <button className="tags-form-btn">Submit</button>
      {isAdded && <span className="success-msg">Added successfully</span>}
    </form>
  );
}

export default TagsForm;
