interface FormLayoutProps {
  title: string;
  children: React.ReactNode;
}

export function FormLayout({ title, children }: FormLayoutProps) {
  return (
    <section className="w-full max-w-[400px] bg-white rounded-md">
      <div className="px-6 py-8 md:py-8 md:px-8">
        <h1 className="font-semibold text-black text-center text-[26px]">
          {title}
        </h1>

        {children}
      </div>
    </section>
  );
}

export function FormHeader({ children }: { children: React.ReactNode }) {
  return <p className="text-center text-gray-600 mt-5">{children}</p>;
}
