import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-background text-foreground py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">About UPSC Prep</h3>
            <p className="text-sm">
              UPSC Prep is your comprehensive resource for UPSC exam preparation,
              offering high-quality content for Prelims, Mains, and Interview stages.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Useful Links</h3>
            <ul className="space-y-2">
              <li><Link href="/prelims" className="hover:text-primary">Prelims</Link></li>
              <li><Link href="/mains" className="hover:text-primary">Mains</Link></li>
              <li><Link href="/interview" className="hover:text-primary">Interview</Link></li>
              <li><Link href="/blog" className="hover:text-primary">Blog</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li>Email: info@upscprep.com</li>
              <li>Phone: +91 1234567890</li>
              <li>Address: 123 UPSC Street, New Delhi, India</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              {/* Add social media icons here */}
            </div>
          </div>
        </div>
        <div className="mt-8 text-center">
          <p>&copy; 2023 UPSC Prep. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;