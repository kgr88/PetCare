import { Button } from '@/components/ui/button';
import { AuthorizedUser } from '@/features/auth/AuthorizeView';
import LogoutLink from '@/features/auth/LogoutLink';
import { LogOut } from 'lucide-react';

export default function AccountPage() {
  return (
    <div className="flex flex-col gap-2">
      <span>
        <span className="font-bold">Email adress: </span>
        <AuthorizedUser value="email" />
      </span>
      <LogoutLink>
        <Button>
          <LogOut />
          Logout
        </Button>
      </LogoutLink>
    </div>
  );
}
