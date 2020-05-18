import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loadCourses } from "../../redux/actions/courseActions";
import * as authorActions from "../../redux/actions/authorActions";
import { newCourse } from "../../tools/mockData";
import CourseForm from "./CourseForm";

function ManageCoursePage({
  courseReducer,
  authorReducer,
  loadCourses,
  ...props
}) {
  const [course, setCourse] = useState({ ...props.course });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (courseReducer.length === 0) {
      loadCourses().catch((error) => {
        alert("Loading courses failure" + error);
      });
    }

    if (authorReducer.length === 0) {
      this.props.actions.loadAuthors().catch((error) => {
        alert(`Loading authors failure${error}`);
      });
    }
  }, []);

  return (
    <div>
      <CourseForm course={course} error={errors} authors={authorReducer} />
    </div>
  );
}

ManageCoursePage.propTypes = {
  course: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired, // 3.
  courseReducer: PropTypes.array.isRequired,
  authorReducer: PropTypes.array.isRequired,
};

function mapStateToProps(state, ownProps) {
  return {
    Course: newCourse,
    courseReducer: state.authorReducer,
    authorReducer: state.authorReducer,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      loadCourses: loadCourses,
      loadAuthors: authorActions.loadAuthors,
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageCoursePage);
