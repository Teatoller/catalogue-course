import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { loadCourses, saveCourse } from "../../redux/actions/courseActions";
import { loadAuthors } from "../../redux/actions/authorActions";
import PropTypes from "prop-types";
import CourseForm from "./CourseForm";
import { newCourse } from "../../tools/mockData"
// import Spinner from "../common/Spinner";
// import { toast } from "react-toastify";

function ManageCoursePage({
  courseReducer,
  authorReducer,
  loadAuthors,
  loadCourses,
  saveCourse,
  history,
  ...props
}) {
  const [course, setCourse] = useState({ ...props.course });
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (courseReducer.length === 0) {
      loadCourses().catch((error) => {
        alert("Loading courses failed" + error);
      });
    } else {
      setCourse({ ...props.course });
    }

    if (authorReducer.length === 0) {
      loadAuthors().catch((error) => {
        alert("Loading authors failed" + error);
      });
    }
  }, [authorReducer.length, courseReducer.length, loadAuthors, loadCourses, props.course]);

  function handleChange(event) {
    const { name, value } = event.target;
    setCourse((prevCourse) => ({
      ...prevCourse,
      [name]: name === "authorId" ? parseInt(value, 10) : value,
    }));
  }

  function formIsValid() {
    const { title, authorId, category } = course;
    const errors = {};

    if (!title) errors.title = "Title is required.";
    if (!authorId) errors.author = "Author is required";
    if (!category) errors.category = "Category is required";

    setErrors(errors);
    // Form is valid if the errors object still has no properties
    return Object.keys(errors).length === 0;
  }

  function handleSave(event) {
    event.preventDefault();
    if (!formIsValid()) return;
    setSaving(true);
    saveCourse(course)
      .then(() => {
        // toast.success("Course saved.");
        history.push("/courses");
      })
      .catch((error) => {
        setSaving(false);
        setErrors({ onSave: error.message });
      });
  }

  return (
    <div>
      <CourseForm
        course={course}
        errors={errors}
        authors={authorReducer}
        onChange={handleChange}
        onSave={handleSave}
        saving={saving}
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
  history: PropTypes.object.isRequired,
};

export function getCourseBySlug(courses, slug) {
  return courses.find((course) => course.slug === slug) || null;
}

function mapStateToProps(state, ownProps) {
  const slug = ownProps.match.params.slug;
  const course =
    slug && state.courseReducer.length > 0
      ? getCourseBySlug(state.courseReducer, slug)
      : newCourse;
  return {
    course,
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
