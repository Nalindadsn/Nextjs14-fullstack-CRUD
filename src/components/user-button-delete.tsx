import { Button } from "./_ui/button";
import { removeUser } from "@/actions/users-actions";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
export function UserButtonDelete({ userId }: { userId: string }) {
  return (
    

      <Dialog>
        <DialogTrigger asChild>
          <Button variant="destructive">DELETE</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </DialogDescription>
          </DialogHeader>
          <form action={removeUser}><input type="hidden" name="userId" value={userId} />

          <Button  variant="destructive" className="w-full">Delete</Button></form>
        </DialogContent>
      </Dialog>
    
  );
}
