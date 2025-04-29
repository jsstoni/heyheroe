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
            key={index}
          >
            <div className="absolute -top-2 -left-2 size-4 border-t-2 border-l-2 border-gray-400" />
            <div className="absolute -right-2 -bottom-2 size-4 border-r-2 border-b-2 border-gray-400" />

            <strong className="absolute -top-6 flex size-12 items-center justify-center rounded-xl border border-primary bg-white text-4xl text-primary">
              {index + 1}
            </strong>
            <h4 className="my-2 text-2xl font-medium">{title}</h4>

            <p className="text-gray-500">{description}</p>
          </div>
        ))}
      </div>
    </>
  );
}
