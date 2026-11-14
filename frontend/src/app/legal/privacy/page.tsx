import type { Metadata } from 'next'
import Legal from '../Legal'

export const metadata: Metadata = { title: 'Privacy policy — MVX Technologies Inc.' }

export default function Privacy() {
  return (
    <Legal title="Privacy policy" updated="14 November 2026">
      <p>
        MVX Technologies Inc. (Quebec City, Canada) respects your privacy. This policy covers this website and the
        software MVX Technologies operates.
      </p>
      <h2>What we collect</h2>
      <p>
        This website does not use cookies or trackers and does not collect personal information. If you email us, we
        keep your message to reply to it. Data that our software accesses through a connection you authorise is used
        only to provide that service.
      </p>
      <h2>How it is protected</h2>
      <p>
        Data is stored on systems we control, transmitted over encrypted connections, and access credentials are
        encrypted at rest. Access is limited to authorised people.
      </p>
      <h2>Sharing</h2>
      <p>We do not sell, rent or share personal or business data with third parties, and we do not use it for advertising.</p>
      <h2>Your choices</h2>
      <p>
        You can revoke any connection you authorised at any time, and ask us to delete the data we hold about you by
        email.
      </p>
      <h2>Changes</h2>
      <p>If this policy changes, the date above changes with it.</p>
    </Legal>
  )
}
