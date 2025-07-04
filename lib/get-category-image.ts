export const getCategoryImage = (categoryName: string | undefined) => {
    if (!categoryName) return "/images/default.jpg";
    
    switch (categoryName) {
      case "Reading Part A":
        return "/images/reading-a.jpg";
      case "Reading Part BC":
        return "/images/reading-bc.jpg";
      case "Listening":
        return "/images/listening.jpg";
      default:
        return "/images/default.jpg";
    }
  };