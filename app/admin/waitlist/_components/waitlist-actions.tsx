// app/admin/waitlist/_components/waitlist-actions.tsx
'use client';

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "react-hot-toast";

interface WaitlistActionsProps {
  data: {
    id: string;
    isInvited: boolean;
    email: string;
  }
}

export function WaitlistActions({ data }: WaitlistActionsProps) {
  const [loading, setLoading] = useState(false);

  const onInvite = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/waitlist/invite`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ 
          waitlistId: data.id,
        })
      });

      if (!response.ok) throw new Error();

      toast.success(`Invite sent to ${data.email}`);
      window.location.reload();
    } catch {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      onClick={onInvite}
      disabled={loading || data.isInvited}
      size="sm"
    >
      {loading ? "Sending..." : data.isInvited ? "Invited" : "Send Invite"}
    </Button>
  );
}

