import { Card } from '~/components/ui/card';

const mockData = {
  requiredTime: 5,
  imageUrl:
    'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcS1_hrqnqzg6eUthXW17yE-tCDHBSVUSFZK279Q6gTC-Sfv1ohJb8Kw4BpSQBpsGQsKPo7Me9LaXksDlcwiu0RY7k8kPChTh0AGse0SgLw9kQ',
  description: 'Rozpocznij studia na kierunku pedagogika',
};

export default function GamePage() {
  return (
    <Card
      requiredTime={mockData.requiredTime}
      imageUrl={mockData.imageUrl}
      description={mockData.description}
    />
  );
}
