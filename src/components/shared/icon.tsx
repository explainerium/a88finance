import {
  Bike,
  Building2,
  Car,
  FileText,
  Globe,
  HeartHandshake,
  Sailboat,
  Shield,
  Store,
  User,
  Users,
  Wrench,
  type LucideIcon,
  type LucideProps,
} from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  car: Car,
  building: Building2,
  user: User,
  users: Users,
  shield: Shield,
  bike: Bike,
  sailboat: Sailboat,
  wrench: Wrench,
  fileText: FileText,
  heartHandshake: HeartHandshake,
  globe: Globe,
  store: Store,
};

export function ContentIcon({
  name,
  ...props
}: { name: string } & LucideProps) {
  const Icon = iconMap[name] ?? User;
  return <Icon {...props} />;
}
