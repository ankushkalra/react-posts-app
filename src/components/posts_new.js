import React from "react";
import { Field, reduxForm } from "redux-form";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { createPost } from "../actions/index";

class PostsNew extends React.Component {
  renderField(field) {
    const { meta } = field;
    const className = `form-group ${meta.touched && meta.error ? "has-danger" : ""}`;

    return (
      <div className={className}>
        <label>{field.label}</label>
        <input className="form-control" type="text" {...field.input} />
        <div className="text-help">{meta.touched ? meta.error : ""}</div>
      </div>
    );
  }

  onSubmit(values) {
    const { createPost } = this.props;
    // console.log(values);
    createPost(values, () => {
      this.props.history.push("/");
    });
  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <div>
        <h3>Post New</h3>
        <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
          <Field name="title" label="Title" component={this.renderField} />
          <Field name="categories" label="Categories" component={this.renderField} />
          <Field name="content" label="Content" component={this.renderField} />
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
          <Link to="/" className="btn btn-danger">
            Cancel
          </Link>
        </form>
      </div>
    );
  }
}

function validate(values) {
  const errors = {};

  // validate the input from values
  if (!values.title) {
    errors.title = "Enter a title!";
  }
  if (!values.categories) {
    errors.categories = "Enter categories!";
  }
  if (!values.content) {
    errors.content = "Enter content";
  }
  return errors;
}

export default reduxForm({
  validate,
  form: "PostsNewForm"
})(
  connect(
    null,
    { createPost }
  )(PostsNew)
);
