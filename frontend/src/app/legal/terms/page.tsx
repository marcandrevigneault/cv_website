import type { Metadata } from 'next'
import Legal from '../Legal'

export const metadata: Metadata = { title: 'Terms of use — MVX Technologies Inc.' }

export default function Terms() {
  return (
    <Legal title="Terms of use" updated="14 November 2026">
      <p>These terms apply to this website and to software provided by MVX Technologies Inc.</p>
      <h2>Licence</h2>
      <p>
        Software provided by MVX Technologies Inc. is licensed, not sold, to the people and organisations we authorise,
        for their own use. You may not resell, redistribute or reverse engineer it.
      </p>
      <h2>Third-party services</h2>
      <p>
        Where our software connects to a third-party service on your behalf, that service&apos;s own terms also apply.
        How we handle the data is described in our <a href="/legal/privacy">privacy policy</a>.
      </p>
      <h2>No warranty</h2>
      <p>
        The website and software are provided as is, without warranty of any kind. To the extent the law allows, MVX
        Technologies Inc. is not liable for indirect or consequential losses arising from their use.
      </p>
      <h2>Governing law</h2>
      <p>The laws of the Province of Quebec and the federal laws of Canada that apply there.</p>
    </Legal>
  )
}
