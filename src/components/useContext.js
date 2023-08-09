import { provide, inject } from 'vue';

const context = Symbol();

export function provideContext(methods) {
	provide(context, methods);
}

export function useContext() {
	const ctx = inject(context);

	return ctx;
}