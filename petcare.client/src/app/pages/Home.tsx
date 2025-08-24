import LogoutLink from '../../features/auth/LogoutLink.tsx';
import AuthorizeView, {
  AuthorizedUser,
} from '../../features/auth/AuthorizeView.tsx';

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
