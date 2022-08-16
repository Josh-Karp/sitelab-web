import { ConstructionOutlined } from "@mui/icons-material";

export const applyFilters = (
  items,
  query,
  filters,
  matcher,
  properties = []
) => {
  return items.filter((item) => {
    let matches = true;

    if (query) {
      let containsQuery = false;

      properties.forEach((property) => {
        if (item[property].toLowerCase().includes(query.toLowerCase())) {
          containsQuery = true;
        }
      });

      if (filters.matcher && item.matcher !== filters.matcher) {
        matches = false;
      }

      if (!containsQuery) {
        matches = false;
      }
    }

    Object.keys(filters).forEach((key) => {
      const value = filters[key];

      if (value && item[key] !== value) {
        matches = false;
      }
    });

    return matches;
  });
};
