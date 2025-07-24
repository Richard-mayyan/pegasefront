import AreaChartComponent from "./area-chart-component";

export default function MembersMetrics() {
  // Dummy data to simulate the undulating pattern
  const generateChartData = () => {
    const data = [];
    for (let i = 0; i < 20; i++) {
      let value = 50 + Math.sin(i * 0.8) * 40 + Math.cos(i * 0.3) * 20;
      if (i < 5) {
        value = 10 + i * 5; // Initial ramp up
      } else if (i > 15) {
        value = 50 - (i - 15) * 5; // End ramp down
      }
      data.push({
        name: `Point ${i}`,
        value: parseInt(`${Math.max(0, Math.min(100, value)).toFixed(2)}`),
      });
    }
    return data;
  };

  const membersData = generateChartData();
  const activeMembersData = generateChartData(); // Using same data as image shows identical charts

  return (
    <div className="min-h-screen bg-gray-100 p-8 flex flex-col items-center gap-8">
      <div className="w-full max-w-4xl">
        <AreaChartComponent title="Membres" data={membersData} id="members" />
      </div>
      <div className="w-full max-w-4xl">
        <AreaChartComponent
          title="Membres actifs"
          data={activeMembersData}
          id="active-members"
        />
      </div>
    </div>
  );
}
