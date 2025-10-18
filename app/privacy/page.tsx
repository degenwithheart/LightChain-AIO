'use client';

import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';
import { APP_CONFIG } from '../../lib/constants';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main 
        className="container mx-auto px-4 py-8 pt-16"
        style={{ 
          minHeight: `clamp(${APP_CONFIG.ui.minContentHeight.mobile}, 50vh, ${APP_CONFIG.ui.minContentHeight.desktop})`
        }}
      >
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary via-primary-light to-secondary bg-clip-text text-transparent mb-4">
              Privacy Policy
            </h1>
            <p className="text-lg text-foreground-secondary max-w-2xl mx-auto">
              Your privacy is important to us. Learn how we collect, use, and protect your information.
            </p>
          </div>

          <div className="glass-card p-8 space-y-8">
            <section>
              <h2 className="text-2xl font-semibold text-primary mb-4">1. Information We Collect</h2>
              <p className="text-foreground-secondary leading-relaxed mb-4">
                We collect information you provide directly to us, such as when you create an account, use our services,
                or contact us for support. This may include:
              </p>
              <ul className="list-disc list-inside space-y-2 text-foreground-secondary">
                <li>Personal information (name, email address, phone number)</li>
                <li>Financial information (wallet addresses, transaction data)</li>
                <li>Usage data (how you interact with our platform)</li>
                <li>Device information (IP address, browser type, operating system)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-primary mb-4">2. How We Use Your Information</h2>
              <p className="text-foreground-secondary leading-relaxed mb-4">
                We use the information we collect to:
              </p>
              <ul className="list-disc list-inside space-y-2 text-foreground-secondary">
                <li>Provide, maintain, and improve our services</li>
                <li>Process transactions and send related information</li>
                <li>Send you technical notices, updates, and support messages</li>
                <li>Respond to your comments, questions, and requests</li>
                <li>Monitor and analyze trends, usage, and activities</li>
                <li>Detect, investigate, and prevent fraudulent transactions</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-primary mb-4">3. Information Sharing</h2>
              <p className="text-foreground-secondary leading-relaxed">
                We do not sell, trade, or otherwise transfer your personal information to third parties without your consent,
                except as described in this policy. We may share your information in the following circumstances:
              </p>
              <ul className="list-disc list-inside mt-4 space-y-2 text-foreground-secondary">
                <li>With service providers who assist us in operating our platform</li>
                <li>To comply with legal obligations or protect our rights</li>
                <li>In connection with a merger, acquisition, or sale of assets</li>
                <li>With your explicit consent</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-primary mb-4">4. Data Security</h2>
              <p className="text-foreground-secondary leading-relaxed">
                We implement appropriate technical and organizational measures to protect your personal information against
                unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the
                internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-primary mb-4">5. Your Rights</h2>
              <p className="text-foreground-secondary leading-relaxed mb-4">
                Depending on your location, you may have the following rights regarding your personal information:
              </p>
              <ul className="list-disc list-inside space-y-2 text-foreground-secondary">
                <li>Access: Request a copy of the personal information we hold about you</li>
                <li>Rectification: Request correction of inaccurate personal information</li>
                <li>Erasure: Request deletion of your personal information</li>
                <li>Portability: Request transfer of your personal information</li>
                <li>Objection: Object to processing of your personal information</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-primary mb-4">6. Cookies and Tracking</h2>
              <p className="text-foreground-secondary leading-relaxed">
                We use cookies and similar tracking technologies to collect and use personal information about you.
                You can control cookies through your browser settings, but disabling cookies may limit your use of our services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-primary mb-4">7. Children's Privacy</h2>
              <p className="text-foreground-secondary leading-relaxed">
                Our services are not intended for children under 18 years of age. We do not knowingly collect personal
                information from children under 18. If we become aware that we have collected personal information from
                a child under 18, we will take steps to delete such information.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-primary mb-4">8. Changes to This Policy</h2>
              <p className="text-foreground-secondary leading-relaxed">
                We may update this privacy policy from time to time. We will notify you of any changes by posting the
                new privacy policy on this page and updating the "Last updated" date.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-primary mb-4">9. Contact Us</h2>
              <p className="text-foreground-secondary leading-relaxed">
                If you have any questions about this privacy policy, please contact us at:
              </p>
              <div className="mt-4 p-4 bg-primary/5 rounded-lg">
                <p className="text-foreground-secondary">Email: {APP_CONFIG.contact.privacy.email}</p>
                <p className="text-foreground-secondary">Address: {APP_CONFIG.contact.business.address}</p>
              </div>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}