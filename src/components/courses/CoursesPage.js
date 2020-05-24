import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import * as courseActions from "../../redux/actions/courseActions";
import * as authorActions from "../../redux/actions/authorActions";
import { bindActionCreators } from "redux";
import CourseList from "./CourseList";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
import Spinner from "../common/Spinner";

class CoursesPage extends React.Component {
  state = {
    redirectToAddCoursePage: false,
  };

  componentDidMount() {
    if (this.props.courses.length === 0) {
      this.props.actions.loadCourses().catch((error) => {
        alert("Loading courses failure" + error);
      });
    }

    if (this.props.authors.length === 0) {
      this.props.actions.loadAuthors().catch((error) => {
        alert(`Loading authors failure${error}`);
      });
    }
  }

  render() {
    return (
      <div>
        <h2>Courses</h2>
        {this.state.redirectToAddCoursePage && <Redirect to="/course" />}
        {this.props.loading ? 
          <Spinner />
         : (
          <div>
            <button
              style={{ marginBottom: 20 }}
              className="btn btn-primary add-course"
              onClick={() => this.setState({ redirectToAddCoursePage: true })}
            >
              Add Course
            </button>
            <CourseList courses={this.props.courses} />
          </div>
        )}
      </div>
    );
  }
}

CoursesPage.propTypes = {
  // dispatch: PropTypes.func.isRequired, // 1.
  // createCourse: PropTypes.func.isRequired, // 2.
  actions: PropTypes.object.isRequired, // 3.
  courses: PropTypes.array.isRequired,
  authors: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
};

function mapStateToProps(state, ownProps) {
  return {
    courses:
      state.authors.length === 0
        ? []
        : state.courses.map((course) => {
            return {
              ...course,
              authorName: state.authors.find(
                (a) => a.id === course.authorId
              ).name,
            };
          }),
    authors: state.authors,
    // loading: state.apiCallsInProgress > 0,
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
