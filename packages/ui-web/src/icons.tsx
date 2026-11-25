import {
  ArrowRight,
  Bike,
  ChevronRight,
  Home,
  MapPin,
  Package,
  Palette,
  Search,
  Settings,
  UserRound,
  type LucideIcon,
} from "lucide-react";
import type { ComponentProps, ReactElement } from "react";
import { designTokens } from "@routely/design-tokens";

const iconRegistry = {
  arrowRight: ArrowRight,
  bike: Bike,
  chevronRight: ChevronRight,
  home: Home,
  mapPin: MapPin,
  package: Package,
  palette: Palette,
  search: Search,
  settings: Settings,
  user: UserRound,
} as const satisfies Record<string, LucideIcon>;

export type RoutelyIconName = keyof typeof iconRegistry;
type IconProps = ComponentProps<LucideIcon>;

export interface RoutelyIconProps extends Omit<IconProps, "color" | "size" | "strokeWidth"> {
  name: RoutelyIconName;
  size?: number;
  color?: string;
  strokeWidth?: number;
  label?: string;
}

export function RoutelyIcon({
  name,
  size = designTokens.componentSizes.icon,
  color = designTokens.colors.forest,
  strokeWidth = designTokens.componentSizes.iconStroke,
  label,
  ...props
}: RoutelyIconProps): ReactElement {
  const Icon = iconRegistry[name];
  return (
    <Icon
      aria-hidden={label ? undefined : true}
      aria-label={label}
      color={color}
      height={size}
      role={label ? "img" : undefined}
      strokeWidth={strokeWidth}
      width={size}
      {...props}
    />
  );
}
