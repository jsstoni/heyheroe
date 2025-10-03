interface Props {
  steps: { title: string; description: string }[];
  subtitle: string;
}

export default function HowItWorks({ subtitle, steps }: Props) {
  return (
    <>
      <div className="mb-16 text-center">
        <h3 className="mb-2 text-3xl md:text-4xl">¿Cómo funciona?</h3>
        <h4 className="text-gray-500">{subtitle}</h4>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {steps.map(({ title, description }, index) => (
          <div
            className="relative rounded-lg border bg-gray-50 p-6"
            // biome-ignore lint/suspicious/noArrayIndexKey: noindex
            key={index}
          >
            <div className="-top-2 -left-2 absolute size-4 border-gray-400 border-t-2 border-l-2" />
            <div className="-right-2 -bottom-2 absolute size-4 border-gray-400 border-r-2 border-b-2" />

            <strong className="-top-6 absolute flex size-12 items-center justify-center rounded-xl border border-primary bg-white text-4xl text-primary">
              {index + 1}
            </strong>
            <h4 className="my-2 font-medium text-2xl">{title}</h4>

            <p className="text-gray-500">{description}</p>
          </div>
        ))}
      </div>
    </>
  );
}
