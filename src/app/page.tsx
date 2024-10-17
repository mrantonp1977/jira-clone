import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Home() {
  return (
    <div className="flex gap-4">
      <Input />
      <Button>Primary</Button>      
      <Button variant={"secondary"}>Secondary</Button>
      <Button variant={"destructive"}>destructive</Button>
      <Button variant={"muted"}>Muted</Button> 
      <Button variant={"ghost"}>ghost</Button> 
      <Button variant={"outline"}>outline</Button>
      <Button variant={"teritary"}>teritary</Button>
    </div>
  );
}
