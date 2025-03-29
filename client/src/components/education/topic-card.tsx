import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";

interface TopicCardProps {
  title: string;
  description: string;
  icon: string;
  color: string;
  link: string;
}

export default function TopicCard({ title, description, icon, color, link }: TopicCardProps) {
  // Create dynamic class names based on the color prop
  const getColorClasses = (colorName: string) => {
    const colorMap: Record<string, { bg: string, text: string, iconBg: string }> = {
      primary: {
        bg: "bg-blue-500/10",
        text: "text-blue-600",
        iconBg: "bg-blue-100"
      },
      secondary: {
        bg: "bg-green-500/10", 
        text: "text-green-600",
        iconBg: "bg-green-100"
      },
      accent: {
        bg: "bg-orange-500/10", 
        text: "text-orange-600",
        iconBg: "bg-orange-100"
      },
      info: {
        bg: "bg-blue-400/10", 
        text: "text-blue-500",
        iconBg: "bg-blue-50"
      },
      success: {
        bg: "bg-green-600/10", 
        text: "text-green-600",
        iconBg: "bg-green-50"
      },
      warning: {
        bg: "bg-yellow-500/10", 
        text: "text-yellow-600",
        iconBg: "bg-yellow-50"
      },
      danger: {
        bg: "bg-red-500/10", 
        text: "text-red-600",
        iconBg: "bg-red-50"
      },
      purple: {
        bg: "bg-purple-500/10", 
        text: "text-purple-600",
        iconBg: "bg-purple-50"
      },
      indigo: {
        bg: "bg-indigo-500/10", 
        text: "text-indigo-600",
        iconBg: "bg-indigo-50"
      }
    };

    return colorMap[colorName] || colorMap.primary;
  };

  const colorClasses = getColorClasses(color);

  return (
    <Card className="transition-all hover:shadow-md">
      <div className={`h-40 ${colorClasses.bg} flex items-center justify-center`}>
        <span className={`material-icons text-5xl ${colorClasses.text}`}>{icon}</span>
      </div>
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <p className="text-gray-600 mb-4">{description}</p>
        <Link href={link}>
          <a className={`${colorClasses.text} hover:underline font-medium flex items-center`}>
            Learn more
            <span className="material-icons text-sm ml-1">arrow_forward</span>
          </a>
        </Link>
      </CardContent>
    </Card>
  );
}
