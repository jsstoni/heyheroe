interface Props {
  steps: { title: string; description: string }[];
}

export default function HowItWorks({ steps }: Props) {
  return (
    <>
      <h3 className="mb-16 text-center text-3xl font-bold">¿Cómo funciona?</h3>

      <div className="grid gap-10 md:grid-cols-3">
        {steps.map(({ title, description }, index) => (
          <div
            className="relative rounded-md border bg-gray-50 p-6"
            key={index}
          >
            <div className="absolute -top-2 -left-2 size-4 border-t-2 border-l-2 border-gray-400" />
            <div className="absolute -right-2 -bottom-2 size-4 border-r-2 border-b-2 border-gray-400" />

            <strong className="text-primary-500 border-primary-400 absolute -top-6 flex size-12 items-center justify-center rounded-xl border bg-white text-4xl">
              {index + 1}
            </strong>
            <h4 className="text-primary-600 my-2 text-2xl font-medium">
              {title}
            </h4>

            <p className="text-gray-500">{description}</p>
          </div>
        ))}
      </div>
    </>
  );
}
