import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loadCourses } from "../../redux/actions/courseActions";
import * as authorActions from "../../redux/actions/authorActions";

class ManageCoursePage extends React.Component {
  componentDidMount() {
    const {
      loadAuthors,
      loadCourses,
      courseReducer,
      authorReducer,
    } = this.props;
    if (courseReducer.length === 0) {
      loadCourses().catch((error) => {
        alert("Loading courses failure" + error);
      });
    }

    if (authorReducer.length === 0) {
      loadAuthors().catch((error) => {
        alert(`Loading authors failure${error}`);
      });
    }
  }

  render() {
    return (
      <div>
        <h2>Manage Course</h2>
      </div>
    );
  }
}

ManageCoursePage.propTypes = {
  loadCourses: PropTypes.func.isRequired,
  loadAuthors: PropTypes.func.isRequired,
  courseReducer: PropTypes.array.isRequired,
  authorReducer: PropTypes.array.isRequired,
};

function mapStateToProps(state, ownProps) {
  return {
    courseReducer: state.courseReducer,
    authorReducer: state.authorReducer,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      loadCourses,
      loadAuthors: authorActions.loadAuthors,
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageCoursePage);
