export async function fetchNotifications(
  page = 1,
  limit = 10,
  notificationType = ""
) {  
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJqaGFuc2lvcnVnYW50aTQzQGdtYWlsLmNvbSIsImV4cCI6MTc4MjM4NjQ4MSwiaWF0IjoxNzgyMzg1NTgxLCJpc3MiOiJBZmZvcmQgTWVkaWNhbCBUZWNobm9sb2dpZXMgUHJpdmF0ZSBMaW1pdGVkIiwianRpIjoiZTY2ZmJmY2YtNzY1Yi00YjQxLWExYWUtNmVlMzg5ZmQ2Y2Q0IiwibG9jYWxlIjoiZW4tSU4iLCJuYW1lIjoib3J1Z2FudGkgamhhbnNpIiwic3ViIjoiNzhkZWViYjgtZGU2Yi00ZjVjLTllNTItNGJhZmEzZTgxYjFjIn0sImVtYWlsIjoiamhhbnNpb3J1Z2FudGk0M0BnbWFpbC5jb20iLCJuYW1lIjoib3J1Z2FudGkgamhhbnNpIiwicm9sbE5vIjoiMjRiMDVhMTIxMSIsImFjY2Vzc0NvZGUiOiJhaFhqdnAiLCJjbGllbnRJRCI6Ijc4ZGVlYmI4LWRlNmItNGY1Yy05ZTUyLTRiYWZhM2U4MWIxYyIsImNsaWVudFNlY3JldCI6InpwTkd1UVRHQldNZVVuQksifQ.67R-Oe-W5l8oZYosNbCY68nc8vRvC3b7-7ruz1cHWls";

  const url = `http://4.224.186.213/evaluation-service/notifications?page=${page}&limit=${limit}&notification_type=${notificationType}`;

const response = await fetch(url,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch notifications");
  }

  const data = await response.json();

  return data.notifications;
}