import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import * as courseActions from "../../redux/actions/courseActions";
import { bindActionCreators } from "redux";

class CoursesPage extends React.Component {
  constructor(props) {
    super();
    this.state = {
      course: {
        title: "",
      },
    };
  }

  handleChange = (event) => {
    const course = { ...this.state.course, title: event.target.value };
    this.setState({ course: course });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    // this.props.dispatch(courseActions.createCourse(this.state.course)); // 1
    // this.props.createCourse(this.state.course); // 2.
    this.props.actions.createCourse(this.state.course); // 3.
    // console.log("successfully submitted");
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <h2>Courses</h2>
        <h3>Add Course</h3>
        <input
          type="text"
          onChange={this.handleChange}
          value={this.state.course.title}
        />
        <input type="submit" value="Save" />
        {this.props.courseReducer.map((course) => (
          <div key={course.title}>{course.title}</div>
        ))}
      </form>
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
