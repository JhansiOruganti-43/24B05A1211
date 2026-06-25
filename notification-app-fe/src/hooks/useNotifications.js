import { useState, useEffect } from "react";
import { fetchNotifications } from "../api/notifications";

export function useNotifications(
  page = 1,
  limit = 10,
  notificationType = ""
) {
    const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function load() {
      try {
        const data = await fetchNotifications(
  page,
  limit,
  notificationType
);

        const priority = {
          Placement: 3,
          Result: 2,
          Event: 1,
        };

        const sorted = [...data].sort((a, b) => {
          if (priority[b.Type] !== priority[a.Type]) {
            return priority[b.Type] - priority[a.Type];
          }

          return new Date(b.Timestamp) - new Date(a.Timestamp);
        });

        setNotifications(sorted.slice(0, 10));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    load();
}, [page, limit, notificationType]);
  return {
    notifications,
    totalPages: 1,
    loading,
    error,
  };
}