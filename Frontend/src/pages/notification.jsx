import { useEffect, useState } from "react";
import axios from "axios";

function Notifications() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await axios.get(
          "http://localhost:8080/api/v1/notifications",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setNotifications(response.data.notifications);
      } catch (error) {
        console.log(
          "Notifications Error:",
          error.response?.data || error.message
        );
      }
    };

    fetchNotifications();
  }, []);

  return (
    <div className="min-h-screen bg-[#030712] text-white py-12 px-6">
      <div className="max-w-4xl mx-auto">
        <p className="text-blue-500 font-medium mb-2">
          NOTIFICATIONS
        </p>

        <h1 className="text-4xl font-bold">
          Notifications
        </h1>

        <p className="text-gray-400 mt-3 mb-8">
          Stay updated with your application status.
        </p>

        {notifications.length === 0 ? (
          <p className="text-gray-400">
            No notifications yet.
          </p>
        ) : (
          <div className="space-y-4">
            {notifications.map((notification) => (
              <div
                key={notification._id}
                className="bg-[#111827] border border-gray-800 rounded-xl p-5"
              >
                <p className="text-gray-200">
                  {notification.message}
                </p>

                <p className="text-gray-500 text-sm mt-2">
                  {new Date(
                    notification.createdAt
                  ).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Notifications;