export const getCategoryImage = (categoryName: string | undefined, courseImageUrl: string | null | undefined) => {
    // If there's a course image URL (for video courses), use it
    if (courseImageUrl) return courseImageUrl;
    
    // Otherwise, use category-based local images
    if (!categoryName) return "/images/default.jpg";
    
    switch (categoryName) {
      case "Reading Part A":
        return "/images/reading-a.jpg";
      case "Reading Part BC":
        return "/images/reading-bc.jpg";
      case "Listening":
        return "/images/listening.jpg";
      default:
        return courseImageUrl || "/images/default.jpg";
    }
  };