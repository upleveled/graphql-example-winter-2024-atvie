import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getUser } from '../../../database/users';
import AnimalsForm from './AnimalsForm';

export default async function DashboardPage() {
  // FIXME: Create secure session token and rename insecureSessionTokenCookie to sessionToken everywhere
  const insecureSessionTokenCookie = cookies().get('sessionToken');

  const user =
    insecureSessionTokenCookie &&
    (await getUser(insecureSessionTokenCookie.value));

  if (!user) {
    redirect('/login?returnTo=/animals/dashboard');
  }

  return <AnimalsForm />;
}
