import AddMemberForm from "./_components/add-member-form";
import MembersDashboard from "./_components/members-dashboard";
import MemberProfileDetails from "./_components/members-profile-details";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center gap-8 p-4">
      <MembersDashboard />
      <MemberProfileDetails />
      <AddMemberForm />
    </div>
  );
}
