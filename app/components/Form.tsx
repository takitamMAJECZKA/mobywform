import Quests from "./Quests"

export default function Form() {
  return (
    <div className="border-2 border-gray-500 p-4 rounded-lg shadow-lg shadow-white/20 bg-[#0a0a0a] backdrop-blur-md m-10">
      <h1 className="text-2xl font-bold text-center">Wypełnij formularz aby otrzymać aplikacje ze swoimi danymi</h1>
      <p></p>
        <Quests />
    </div>
  );
}