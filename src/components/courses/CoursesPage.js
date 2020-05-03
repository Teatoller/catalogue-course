import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import * as courseActions from "../../redux/actions/courseActions";
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
    this.props.dispatch(courseActions.createCourse(this.state.course));
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

function mapStateToProps(state, ownProps) {
  return { courseReducer: state.courseReducer };
}

CoursesPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  courseReducer: PropTypes.array.isRequired,
};

export default connect(mapStateToProps)(CoursesPage);
