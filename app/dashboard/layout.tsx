import { AuthBoundary } from '../components/AuthBoundary';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AuthBoundary>{children}</AuthBoundary>;
}
