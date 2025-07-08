import FormComponent from "./components/Form";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground">
      <FormComponent/>
    </div>
  );
}