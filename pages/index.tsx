import { IncomingMessage } from "http";
import { Session } from "next-auth";
import { signOut, getSession, useSession } from "next-auth/react";
import Link from "next/link";
import { ReactNode } from "react";

export function Home(): ReactNode {
	const { data: session } = useSession();

	if (typeof window === undefined) return null;

	if (session) {
		return (
			<main>
				<h1>Home</h1>
				<h2>Signed in as {session.user!.email}</h2>
				<button onClick={() => signOut()}>Sign out</button>
			</main>
		);
	}

	return (
		<main>
			<h1>Home</h1>
			<h2>Not signed in</h2>
			<Link href="/login" passHref>
				<button>Sign in</button>
			</Link>
		</main>
	);
}

export async function getServerSideProps({ req }: { req: IncomingMessage }) {
	const session = await getSession({ req });

	return { props: { session: session } };
}

export default Home;
