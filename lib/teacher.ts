export const isTeacher = (userId?: string | null) => {
  return userId === process.env.NEXT_PUBLIC_TEACHER_ID;
}

// export const isTeacher = (userId: string | null | undefined): boolean => {
//   if (!userId) return false;
//   const teacherIds = process.env.NEXT_PUBLIC_TEACHER_IDS?.split(',') || [];
//   return teacherIds.includes(userId);
// };
