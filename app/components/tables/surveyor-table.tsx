import { AdminAvatars } from "../admin-avatars";

export function SurveyorTable({ surveyors, preview = false }) {
  return (
    <div className="overflow-x-auto">
      <table className="table w-full">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            {!preview && <th>Managed By</th>}
            <th>Assignments</th>
          </tr>
        </thead>
        <tbody>
          {surveyors.map((surveyor, i) => (
            <tr key={i} className="hover">
              <td>
                {surveyor.user.firstName} {surveyor.user.lastName}
              </td>
              <td>{surveyor.user.email}</td>
              {!preview && (
                <td>
                  <AdminAvatars admins={surveyor.admins} id={surveyor.id} />
                </td>
              )}
              <td>
                {surveyor.assignments.filter((a) => a.completed).length} /{" "}
                {surveyor.assignments.length} completed
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
