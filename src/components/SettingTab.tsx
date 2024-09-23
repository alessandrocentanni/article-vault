import "~style.css";

import SettingForm from "~components/SettingForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~components/ui/card";

// TODO: link to the instructions (once they are ready)
function SettingTab() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Settings</CardTitle>
        <CardDescription>Check the README file </CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <SettingForm />
      </CardContent>
      <CardFooter className="flex-col" />
    </Card>
  );
}

export default SettingTab;
