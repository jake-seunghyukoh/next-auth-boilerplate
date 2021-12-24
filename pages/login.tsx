import { IncomingMessage } from "http";
import { Provider } from "next-auth/providers";
import { getProviders, getSession, signIn } from "next-auth/react";
import PropTypes from "prop-types";

type LoginProps = {
	providers: Provider[];
};

export function Login({ providers }: LoginProps) {
	return (
		<main>
			<h1>Login</h1>
			{Object.values(providers).map((provider) => (
				<div key={provider.id}>
					<button onClick={() => signIn(provider.id)}>
						Sign in with {provider.name}
					</button>
				</div>
			))}
		</main>
	);
}

export async function getServerSideProps({ req }: { req: IncomingMessage }) {
	const session = await getSession({ req });

	if (session?.user) {
		return { redirect: { destination: "/", permanent: false } };
	}

	return {
		props: { providers: await getProviders() },
	};
}

Login.propTypes = { title: PropTypes.string };

export default Login;
