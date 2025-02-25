"use client"

import { useState } from "react"
import { User } from "@/types/user"
import { Edit, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

interface UserActionsProps {
  user: User
  onDelete: (user: User) => void
  onEdit: () => void
  onClose: () => void
}

export function UserActions({ user, onDelete, onEdit, onClose }: UserActionsProps) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)

  const handleDelete = () => {
    onDelete(user)
    setShowDeleteDialog(false)
    onClose()
  }

  return (
    <div className="flex gap-2">
      <Button 
        className="flex-1"
        onClick={onEdit}
      >
        <Edit className="h-4 w-4 mr-2" />
        Edit User
      </Button>
      <Button 
        variant="destructive"
        className="flex-1"
        onClick={() => setShowDeleteDialog(true)}
      >
        <Trash2 className="h-4 w-4 mr-2" />
        Delete User
      </Button>

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete User</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete {user.name}? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              onClick={handleDelete}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}