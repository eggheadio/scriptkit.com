import ConvertKitForm from 'convertkit-react/bin/convertkit-react.esm'

const MY_FORM_ID = 2216586

import Layout from 'layouts'

export default function Confirm() {
  return (
    <Layout
      withFooter={false}
      meta={{title: 'Subscription confirmed'}}
      className="flex items-center justify-center"
    >
      <div className="max-w-screen-sm text-center sm:pb-32 pb-16 text-black">
        <style>
          {`
            button[type="submit"] {
                background-color: rgb(250 204 21 / var(--tw-bg-opacity));
                color: #000;
                height: 2.5rem;
                border-radius: 0.25rem;
                border: 1px solid #000;
                font-size: 1rem;
                font-weight: 500;
                padding: 0 1rem;
                transition: all 0.2s ease-in-out;
            }
            
            input {
            
                color: #000;
                height: 2.5rem;
                border-radius: 0.25rem;
                border: 1px solid #000;
                font-size: 1rem;
                font-weight: 500;
                padding: 0 1rem;
                transition: all 0.2s ease-in-out;
            }

            
            
            `}
        </style>
        <ConvertKitForm formId={MY_FORM_ID} />
      </div>
    </Layout>
  )
}
