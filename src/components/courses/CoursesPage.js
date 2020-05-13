import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import * as courseActions from "../../redux/actions/courseActions";
import * as authorActions from "../../redux/actions/authorActions";
import { bindActionCreators } from "redux";
import CourseList from "./CourseList";

class CoursesPage extends React.Component {
  componentDidMount() {
    if (this.props.courseReducer.length === 0) {
      this.props.actions.loadCourses().catch((error) => {
        alert("Loading courses failure" + error);
      });
    }

    if (this.props.authorReducer.length === 0) {
      this.props.actions.loadAuthors().catch((error) => {
        alert(`Loading authors failure${error}`);
      });
    }
  }

  render() {
    return (
      <div>
        <h2>Courses</h2>
        <CourseList courses={this.props.courseReducer} />
      </div>
    );
  }
}

CoursesPage.propTypes = {
  // dispatch: PropTypes.func.isRequired, // 1.
  // createCourse: PropTypes.func.isRequired, // 2.
  actions: PropTypes.object.isRequired, // 3.
  courseReducer: PropTypes.array.isRequired,
  authorReducer: PropTypes.array.isRequired,
};

function mapStateToProps(state, ownProps) {
  return {
    courseReducer:
      state.authorReducer.length === 0
        ? []
        : state.courseReducer.map((course) => {
            return {
              ...course,
              authorName: state.authorReducer.find(
                (a) => a.id === course.authorId
              ).name,
            };
          }),
    authorReducer: state.authorReducer,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    // createCourse: (course) => dispatch(courseActions.createCourse(course)), // 1.
    // actions: bindActionCreators(courseActions, dispatch), // 3.
    actions: {
      loadCourses: bindActionCreators(courseActions.loadCourses, dispatch), // 4.
      loadAuthors: bindActionCreators(authorActions.loadAuthors, dispatch), // 4.
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage);
