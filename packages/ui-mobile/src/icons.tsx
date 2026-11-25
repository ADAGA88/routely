import ArrowRight from "lucide-react-native/icons/arrow-right";
import ArrowLeft from "lucide-react-native/icons/arrow-left";
import Bell from "lucide-react-native/icons/bell";
import Bike from "lucide-react-native/icons/bike";
import CalendarDays from "lucide-react-native/icons/calendar-days";
import ChartColumn from "lucide-react-native/icons/chart-column";
import CircleCheck from "lucide-react-native/icons/circle-check";
import ClipboardList from "lucide-react-native/icons/clipboard-list";
import ChevronRight from "lucide-react-native/icons/chevron-right";
import Eye from "lucide-react-native/icons/eye";
import Ellipsis from "lucide-react-native/icons/ellipsis";
import History from "lucide-react-native/icons/history";
import Headphones from "lucide-react-native/icons/headphones";
import Home from "lucide-react-native/icons/home";
import MapPin from "lucide-react-native/icons/map-pin";
import Mail from "lucide-react-native/icons/mail";
import MessageCircle from "lucide-react-native/icons/message-circle";
import Package from "lucide-react-native/icons/package";
import Palette from "lucide-react-native/icons/palette";
import Phone from "lucide-react-native/icons/phone";
import Plus from "lucide-react-native/icons/plus";
import Search from "lucide-react-native/icons/search";
import Send from "lucide-react-native/icons/send";
import Settings from "lucide-react-native/icons/settings";
import Shield from "lucide-react-native/icons/shield";
import ShieldCheck from "lucide-react-native/icons/shield-check";
import Star from "lucide-react-native/icons/star";
import TrendingUp from "lucide-react-native/icons/trending-up";
import UserRound from "lucide-react-native/icons/user-round";
import UsersRound from "lucide-react-native/icons/users-round";
import Wallet from "lucide-react-native/icons/wallet";
import Warehouse from "lucide-react-native/icons/warehouse";
import Wrench from "lucide-react-native/icons/wrench";
import type { ComponentProps, ReactElement } from "react";
import { designTokens } from "@routely/design-tokens";
import { Circle, Path, Svg } from "react-native-svg";

type IconProps = ComponentProps<typeof Bike>;

function MotorcycleGlyph({ color, size, strokeWidth }: IconProps): ReactElement {
  return (
    <Svg height={size} viewBox="0 0 24 24" width={size}>
      <Circle cx="6" cy="17" fill="none" r="3.1" stroke={color} strokeWidth={strokeWidth} />
      <Circle cx="18" cy="17" fill="none" r="3.1" stroke={color} strokeWidth={strokeWidth} />
      <Path
        d="M6 17l3.6-7h4.1l4.3 7h-5.2l-3.1-4.1M9.6 10l-1.3-2.2h3.2m6.5 9.2h3.1l-1.3-3.4h-3.6"
        fill="none"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={strokeWidth}
      />
      <Path
        d="M10.1 10h4l2.4 4.1h-4.2l-2.2-2.8z"
        fill={color}
        stroke={color}
        strokeLinejoin="round"
        strokeWidth={typeof strokeWidth === "number" ? strokeWidth * 0.65 : 1.2}
      />
    </Svg>
  );
}

function FleetMotorcycleGlyph({ color, size }: IconProps): ReactElement {
  const { colors } = designTokens;
  return (
    <Svg height={size} viewBox="0 0 48 48" width={size}>
      <Circle cx="11" cy="35" r="7" fill={color} />
      <Circle cx="37" cy="35" r="7" fill={color} />
      <Circle cx="11" cy="35" r="4" fill={colors.white} />
      <Circle cx="37" cy="35" r="4" fill={colors.white} />
      <Circle cx="11" cy="35" r="1.5" fill={colors.lime} />
      <Circle cx="37" cy="35" r="1.5" fill={colors.lime} />
      <Path
        d="M11 35l8-14h8l10 14H25l-5-8-4 8H11zm8-14l-2-4h5m8-1h4l3 7"
        fill="none"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2.5"
      />
      <Path d="M18 20h11l4 7H22z" fill={color} />
      <Path d="M21 21h6l2 3h-7z" fill={colors.lime} />
      <Path d="M23 29h5l2 4h-5z" fill={colors.forest} />
      <Path d="M15 17h8" stroke={color} strokeLinecap="round" strokeWidth="2.5" />
    </Svg>
  );
}

function FleetActiveGlyph({ color, size }: IconProps): ReactElement {
  const { colors } = designTokens;
  return (
    <Svg height={size} viewBox="0 0 48 48" width={size}>
      <Circle cx="24" cy="24" r="20" fill={color} />
      <Circle cx="24" cy="24" r="15" fill={colors.white} />
      <Path
        d="M13 25a11 11 0 0 1 22 0"
        fill="none"
        stroke={colors.lime}
        strokeLinecap="round"
        strokeWidth="4"
      />
      <Path d="M24 25l6-6" fill="none" stroke={color} strokeLinecap="round" strokeWidth="3" />
      <Circle cx="24" cy="25" r="3" fill={color} />
      <Path d="M19 32h10" stroke={color} strokeLinecap="round" strokeWidth="2" />
    </Svg>
  );
}

function FleetMaintenanceGlyph({ color, size }: IconProps): ReactElement {
  const { colors } = designTokens;
  return (
    <Svg height={size} viewBox="0 0 48 48" width={size}>
      <Circle cx="24" cy="24" r="18" fill={color} />
      <Circle cx="24" cy="24" r="13" fill={colors.white} />
      <Circle cx="24" cy="24" r="10" fill={colors.container} stroke={color} strokeWidth="2" />
      <Path
        d="M34 10a8 8 0 0 0-9 10L14 31a4 4 0 0 0 5 5l11-11a8 8 0 0 0 10-9l-5 5-5-2-2-4z"
        fill={colors.lime}
        stroke={color}
        strokeLinejoin="round"
        strokeWidth="2"
      />
      <Circle cx="17" cy="33" r="1.5" fill={color} />
    </Svg>
  );
}

function AgentRidersGlyph({ color, size }: IconProps): ReactElement {
  return (
    <Svg height={size} viewBox="0 0 32 32" width={size}>
      <Circle cx="12" cy="9" r="5" fill={color} />
      <Path d="M3 25c0-5 3.8-8 9-8s9 3 9 8v2H3z" fill={color} />
      <Circle cx="23" cy="11" r="4" fill={designTokens.colors.lime} />
      <Path
        d="M21 19c4.5-1.1 8 1.8 8 6v2h-6v-2c0-2.4-.7-4.4-2-6z"
        fill={designTokens.colors.lime}
      />
    </Svg>
  );
}

function AgentTasksGlyph({ color, size }: IconProps): ReactElement {
  return (
    <Svg height={size} viewBox="0 0 32 32" width={size}>
      <Circle cx="16" cy="16" r="14" fill={color} />
      <Path
        d="m9.5 16 4.2 4.2 8.8-9"
        fill="none"
        stroke={designTokens.colors.white}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="3"
      />
    </Svg>
  );
}

function AgentRiderGlyph({ color, size }: IconProps): ReactElement {
  return (
    <Svg height={size} viewBox="0 0 24 24" width={size}>
      <Circle cx="12" cy="7" r="3.5" fill={color} />
      <Path d="M4.5 19c0-4 3.2-6.5 7.5-6.5s7.5 2.5 7.5 6.5v1H4.5z" fill={color} />
      <Path d="m10 15 2 2 2-2" fill="none" stroke={designTokens.colors.white} strokeWidth="1.5" />
    </Svg>
  );
}

function AgentDocumentGlyph({ color, size }: IconProps): ReactElement {
  return (
    <Svg height={size} viewBox="0 0 24 24" width={size}>
      <Path d="M6 2h8l5 5v13a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z" fill={color} />
      <Path
        d="M14 2v5h5M8 12h7M8 16h7"
        fill="none"
        stroke={designTokens.colors.white}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.6"
      />
    </Svg>
  );
}

const iconRegistry = {
  agentDocument: AgentDocumentGlyph,
  agentRider: AgentRiderGlyph,
  agentRiders: AgentRidersGlyph,
  agentTasks: AgentTasksGlyph,
  arrowLeft: ArrowLeft,
  arrowRight: ArrowRight,
  bell: Bell,
  bike: Bike,
  calendar: CalendarDays,
  chart: ChartColumn,
  checkCircle: CircleCheck,
  clipboardList: ClipboardList,
  chevronRight: ChevronRight,
  eye: Eye,
  ellipsis: Ellipsis,
  fleetMotorcycle: FleetMotorcycleGlyph,
  fleetActive: FleetActiveGlyph,
  fleetMaintenance: FleetMaintenanceGlyph,
  history: History,
  headphones: Headphones,
  home: Home,
  mapPin: MapPin,
  mail: Mail,
  message: MessageCircle,
  motorcycle: MotorcycleGlyph,
  package: Package,
  palette: Palette,
  phone: Phone,
  plus: Plus,
  search: Search,
  send: Send,
  settings: Settings,
  shield: Shield,
  shieldCheck: ShieldCheck,
  star: Star,
  trendingUp: TrendingUp,
  user: UserRound,
  users: UsersRound,
  wallet: Wallet,
  warehouse: Warehouse,
  wrench: Wrench,
} as const;

export type RoutelyIconName = keyof typeof iconRegistry;

export interface RoutelyIconProps extends Omit<IconProps, "color" | "size" | "strokeWidth"> {
  name: RoutelyIconName;
  size?: number;
  color?: string;
  strokeWidth?: number;
}

export function RoutelyIcon({
  name,
  size = designTokens.componentSizes.icon,
  color = designTokens.colors.forest,
  strokeWidth = designTokens.componentSizes.iconStroke,
  ...props
}: RoutelyIconProps): ReactElement {
  const Icon = iconRegistry[name];
  return <Icon color={color} size={size} strokeWidth={strokeWidth} {...props} />;
}
