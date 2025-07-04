export const getCategoryColor = (categoryName: string | undefined) => {
    if (!categoryName) return "bg-slate-100";
  
    switch (categoryName) {
      case "Listening":
        return "bg-blue-100";
      case "Reading Part A":
        return "bg-emerald-100";
      case "Reading Part BC":
        return "bg-purple-100";
      case "Speaking":
        return "bg-orange-100";
      case "Writing":
        return "bg-pink-100";
      default:
        return "bg-slate-100";
    }
  };


// If you want a separate helper:
export function getShortCategoryName(category: string): string {
  switch (category) {
    case "Reading Part A":
      return "Reading A";
    case "Reading Part BC":
      return "Reading B/C";
    default:
      return category;
  }
}
