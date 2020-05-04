import * as types from "../constants/courseActionTypes";

export function createCourse(course) {
  return { type: types.CREATE_COURSE, course: course };
}
