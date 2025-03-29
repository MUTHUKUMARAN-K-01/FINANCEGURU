import { Card, CardContent } from "@/components/ui/card";

interface TestimonialCardProps {
  content: string;
  author: string;
  title: string;
  rating: number;
}

export default function TestimonialCard({ content, author, title, rating }: TestimonialCardProps) {
  // Generate star ratings
  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <span key={i} className="material-icons text-amber-400">
          {i < rating ? "star" : "star_border"}
        </span>
      );
    }
    return stars;
  };

  return (
    <Card className="bg-white p-6 rounded-lg shadow-sm">
      <CardContent className="p-0">
        <div className="flex items-center mb-4">
          <div className="text-amber-400 flex">
            {renderStars(rating)}
          </div>
        </div>
        <p className="text-gray-700 mb-4">"{content}"</p>
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center mr-3">
            <span className="material-icons text-gray-500">person</span>
          </div>
          <div>
            <h4 className="font-medium">{author}</h4>
            <p className="text-sm text-gray-500">{title}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
