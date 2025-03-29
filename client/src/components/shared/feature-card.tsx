import { Card, CardContent } from "@/components/ui/card";

interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
  colorType: string;
}

export default function FeatureCard({ icon, title, description, colorType }: FeatureCardProps) {
  // Define color mappings
  const colorMap: Record<string, { bgColor: string, textColor: string }> = {
    primary: {
      bgColor: 'bg-blue-100',
      textColor: 'text-blue-600'
    },
    secondary: {
      bgColor: 'bg-green-100',
      textColor: 'text-green-600'
    },
    accent: {
      bgColor: 'bg-orange-100',
      textColor: 'text-orange-600'
    },
    info: {
      bgColor: 'bg-blue-100/70',
      textColor: 'text-blue-500'
    },
    success: {
      bgColor: 'bg-green-100/70',
      textColor: 'text-green-600'
    },
    warning: {
      bgColor: 'bg-yellow-100',
      textColor: 'text-yellow-600'
    },
    danger: {
      bgColor: 'bg-red-100',
      textColor: 'text-red-600'
    }
  };

  // Get color classes or default to primary if not found
  const { bgColor, textColor } = colorMap[colorType] || colorMap.primary;

  return (
    <Card className="bg-gray-50 p-6 rounded-lg shadow-sm transition-all hover:shadow-md">
      <CardContent className="p-0">
        <div className={`w-12 h-12 rounded-lg ${bgColor} flex items-center justify-center mb-4`}>
          <span className={`material-icons ${textColor}`}>{icon}</span>
        </div>
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </CardContent>
    </Card>
  );
}
