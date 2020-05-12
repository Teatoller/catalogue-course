import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import * as courseActions from "../../redux/actions/courseActions";
import { bindActionCreators } from "redux";
import CourseList from "./CourseList";

class CoursesPage extends React.Component {
  componentDidMount() {
    this.props.actions.loadCourses().catch((error) => {
      alert("Loading courses failure" + error);
    });
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
};

function mapStateToProps(state, ownProps) {
  return { courseReducer: state.courseReducer };
}

function mapDispatchToProps(dispatch) {
  return {
    // createCourse: (course) => dispatch(courseActions.createCourse(course)), // 1.
    actions: bindActionCreators(courseActions, dispatch), // 3.
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage);
