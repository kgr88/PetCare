import LogoutLink from '../Components/LogoutLink.tsx';
import AuthorizeView, { AuthorizedUser } from '../Components/AuthorizeView.tsx';

export default function Home() {
  return (
    <AuthorizeView>
      <span>
        <LogoutLink>
          Logout <AuthorizedUser value="email" /> test test
        </LogoutLink>
      </span>
    </AuthorizeView>
  );
}
