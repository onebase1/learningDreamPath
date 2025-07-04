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
  