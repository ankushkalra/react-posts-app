import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchPosts } from "../actions/index";
import _ from "lodash";

class PostsIndex extends React.Component {
  componentDidMount() {
    this.props.fetchPosts();
  }

  renderPosts() {
    return _.map(this.props.posts, post => {
      return (
        <li className="list-group-item" key={post.id}>
          <Link to={`/posts/${post.id}`}>{post.id}</Link>
        </li>
      );
    });
  }

  onSubmit(values) {
    const { createPost } = this.props;
    // console.log(values);
    createPost(values, () => {
      this.props.history.push("/");
    });
  }



  render() {
    return (
      <div>
        <div className="text-xs-right">
          <Link className="btn btn-primary" to="/posts/new">
            Add a Post
          </Link>
        </div>
        <h3>Posts</h3>
        {this.renderPosts()}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    posts: state.posts
  };
}

export default connect(
  mapStateToProps,
  { fetchPosts }
)(PostsIndex);
