"use client"

import { User } from "@/types/user"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { UserInfo } from "@/components/users/user-info"
import { UserActions } from "@/components/users/user-actions"
import { UserEditForm } from "@/components/users/user-edit-form"
import { useState } from "react"

interface UserDetailsDialogProps {
  user: User | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onDelete: (user: User) => void
}

export function UserDetailsDialog({
  user,
  open,
  onOpenChange,
  onDelete
}: UserDetailsDialogProps) {
  const [isEditing, setIsEditing] = useState(false)

  if (!user) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] p-6">
        <DialogHeader className="mb-6">
          <DialogTitle>{isEditing ? "Edit User" : "User Details"}</DialogTitle>
          <DialogDescription>
            {isEditing ? "Update user information" : "View and manage user information"}
          </DialogDescription>
        </DialogHeader>
        
        {isEditing ? (
          <UserEditForm 
            user={user} 
            onCancel={() => setIsEditing(false)}
            onClose={() => onOpenChange(false)}
          />
        ) : (
          <div className="space-y-8">
            <UserInfo user={user} />
            <UserActions 
              user={user} 
              onDelete={onDelete} 
              onEdit={() => setIsEditing(true)}
              onClose={() => onOpenChange(false)} 
            />
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}