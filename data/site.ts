/*
 * Site-wide links.
 *
 * The registration form is referenced from more than one place — the hero's
 * tag and the swimming fish — so it lives here rather than being written out
 * twice. One edit when the form moves.
 */
export const REGISTER_HREF = "https://form.typeform.com/to/VbwryQz0";

/*
 * Whether registration is taking sign-ups. While false, the hero tag and the
 * fish both read "registration closed" and link nowhere. Set it back to true
 * to restore them both — the link preview (app/layout.tsx and the image in
 * app/_og/) says "Registration closed" too, and is changed by hand.
 */
export const REGISTRATION_OPEN = false;
