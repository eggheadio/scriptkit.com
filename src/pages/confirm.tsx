import Layout from 'layouts'

export default function Confirm() {
  return (
    <Layout
      withFooter={false}
      meta={{title: 'Confirm your subscription'}}
      className="flex items-center justify-center"
    >
      <div className="max-w-screen-sm text-center sm:pb-32 pb-16">
        <span
          role="img"
          aria-label="incoming envelope"
          className="sm:text-7xl text-6xl block pb-5"
        >
          📨
        </span>
        <h1 className="sm:text-4xl text-3xl font-bold pb-2">
          Thanks so much for signing up! There's one last step.
        </h1>
        <div className="pt-4 text-lg">
          <p>
            <strong className="text-yellow-300">Please check your inbox</strong>{' '}
            for an email that just got sent.
          </p>
          <p>
            You'll need to{' '}
            <strong className="text-yellow-300">
              click the confirmation link
            </strong>{' '}
            to receive any further emails. 👀
          </p>
        </div>
      </div>
    </Layout>
  )
}
