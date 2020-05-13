import * as types from "../constants/courseActionTypes";
import * as courseApi from "../../api/courseApi";

// action creator
export function createCourse(course) {
  return { type: types.CREATE_COURSE, course: course };
}

// thunk
export function loadCoursesSuccess(courses) {
  return { type: types.LOAD_COURSES_SUCCESS, courses: courses };
}

export function loadCourses() {
  return (dispatch) => {
    return courseApi
      .getCourses()
      .then((courses) => {
        dispatch(loadCoursesSuccess(courses));
      })
      .catch((error) => {
        throw error;
      });
  };
}
