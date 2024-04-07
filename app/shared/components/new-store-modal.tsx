interface Props {
  title: string;
  isOpen?: boolean;
}

export const NewStoreModal = ({ title, isOpen = false }: Props) => {
  return (
    <dialog open={isOpen}>
      <article>
        <header>
          <p>
            <strong>{title}</strong>
          </p>
        </header>
        <form>
          <fieldset>
            <label>
              First name
              <input
                name="first_name"
                placeholder="First name"
                autoComplete="given-name"
              />
            </label>
            <label>
              Email
              <input
                type="email"
                name="email"
                placeholder="Email"
                autoComplete="email"
              />
            </label>
          </fieldset>

          <input type="submit" value="Subscribe" />
        </form>
      </article>
    </dialog>
  );
};
