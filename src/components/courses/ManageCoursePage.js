import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { loadCourses, saveCourse } from "../../redux/actions/courseActions";
import { loadAuthors } from "../../redux/actions/authorActions";
import PropTypes from "prop-types";
import CourseForm from "./CourseForm";
import { newCourse } from "../../tools/mockData"

function ManageCoursePage({
  courseReducer,
  authorReducer,
  loadAuthors,
  loadCourses,
  saveCourse,
  ...props
}) {
  const [course, setCourse] = useState({ ...props.course });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (courseReducer.length === 0) {
      loadCourses().catch((error) => {
        alert("Loading courseReducer failed" + error);
      });
    }

    if (authorReducer.length === 0) {
      loadAuthors().catch((error) => {
        alert("Loading authorReducer failed" + error);
      });
    }
  }, []);

  function handleChange(event) {
    const { name, value } = event.target;
    setCourse((prevCourse) => ({
      ...prevCourse,
      [name]: name === "authorId" ? parseInt(value, 10) : value,
    }));
  }

  function handleSave(event) {
    event.preventDefault();
    saveCourse(course);
  }

  return (
    <div>
      <CourseForm
        course={course}
        errors={errors}
        authors={authorReducer}
        onChange={handleChange}
        onSave={handleSave}
      />
    </div>
  );
}

ManageCoursePage.propTypes = {
  course: PropTypes.object.isRequired,
  authorReducer: PropTypes.array.isRequired,
  courseReducer: PropTypes.array.isRequired,
  loadCourses: PropTypes.func.isRequired,
  loadAuthors: PropTypes.func.isRequired,
  saveCourse: PropTypes.func.isRequired,
};

function mapStateToProps(state, ownProps) {
  return {
    course: newCourse,
    courseReducer: state.courseReducer,
    authorReducer: state.authorReducer,
  };
}

const mapDispatchToProps = {
  loadCourses,
  loadAuthors,
  saveCourse,
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageCoursePage);
